const vm = require('vm');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

// 本模块只覆盖 obfuscator.io 类混淆，不做完整通用 AST 框架。
// 主流程固定为：
//   1. 还原字面量噪声，并折叠简单常量；
//   2. 在 VM 沙箱中只重建字符串数组解码运行时；
//   3. 替换参数已经是字面量的 decoder 调用；
//   4. 内联常见对象包装器；
//   5. 展平标准 while/switch 控制流。
// 这些步骤显式保留，方便命令行直接使用，也方便新样本只命中部分规则时定位问题。

function parse(code) {
  return parser.parse(code, {
    sourceType: 'unambiguous',
    allowReturnOutsideFunction: true,
    plugins: ['jsx']
  });
}

function gen(node, options = {}) {
  return generate(node, { comments: false, compact: false, jsescOption: { minimal: true }, ...options }).code;
}

function compact(node) {
  return generate(node, { comments: false, compact: true }).code;
}

function isLiteral(node) {
  return t.isStringLiteral(node) || t.isNumericLiteral(node) || t.isBooleanLiteral(node) || t.isNullLiteral(node);
}

function literalValue(node) {
  return t.isNullLiteral(node) ? null : node.value;
}

// 对纯字面量表达式做静态求值，供常量分支清理使用。
// 这里不读取变量、不执行函数，只递归处理字面量、字面量运算和三元表达式。
function constantValue(path) {
  if (!path || !path.node) return { confident: false };
  if (isLiteral(path.node)) return { confident: true, value: literalValue(path.node) };

  if (path.isUnaryExpression()) {
    const arg = constantValue(path.get('argument'));
    if (!arg.confident) return { confident: false };
    switch (path.node.operator) {
      case '!':
        return { confident: true, value: !arg.value };
      case '+':
        return { confident: true, value: +arg.value };
      case '-':
        return { confident: true, value: -arg.value };
      case '~':
        return { confident: true, value: ~arg.value };
      case 'void':
        return { confident: true, value: undefined };
      default:
        return { confident: false };
    }
  }

  if (path.isBinaryExpression()) {
    const left = constantValue(path.get('left'));
    const right = constantValue(path.get('right'));
    if (!left.confident || !right.confident) return { confident: false };
    try {
      switch (path.node.operator) {
        case '==':
          return { confident: true, value: left.value == right.value };
        case '!=':
          return { confident: true, value: left.value != right.value };
        case '===':
          return { confident: true, value: left.value === right.value };
        case '!==':
          return { confident: true, value: left.value !== right.value };
        case '<':
          return { confident: true, value: left.value < right.value };
        case '<=':
          return { confident: true, value: left.value <= right.value };
        case '>':
          return { confident: true, value: left.value > right.value };
        case '>=':
          return { confident: true, value: left.value >= right.value };
        case '+':
          return { confident: true, value: left.value + right.value };
        case '-':
          return { confident: true, value: left.value - right.value };
        case '*':
          return { confident: true, value: left.value * right.value };
        case '/':
          return { confident: true, value: left.value / right.value };
        case '%':
          return { confident: true, value: left.value % right.value };
        case '|':
          return { confident: true, value: left.value | right.value };
        case '&':
          return { confident: true, value: left.value & right.value };
        case '^':
          return { confident: true, value: left.value ^ right.value };
        case '<<':
          return { confident: true, value: left.value << right.value };
        case '>>':
          return { confident: true, value: left.value >> right.value };
        case '>>>':
          return { confident: true, value: left.value >>> right.value };
        default:
          return { confident: false };
      }
    } catch (_) {
      return { confident: false };
    }
  }

  if (path.isLogicalExpression()) {
    const left = constantValue(path.get('left'));
    if (!left.confident) return { confident: false };
    if (path.node.operator === '&&') {
      if (!left.value) return { confident: true, value: left.value };
      return constantValue(path.get('right'));
    }
    if (path.node.operator === '||') {
      if (left.value) return { confident: true, value: left.value };
      return constantValue(path.get('right'));
    }
  }

  if (path.isConditionalExpression()) {
    const test = constantValue(path.get('test'));
    if (!test.confident) return { confident: false };
    return constantValue(test.value ? path.get('consequent') : path.get('alternate'));
  }

  return { confident: false };
}

function keyName(path) {
  if (!path || !path.node) return undefined;
  if (path.isIdentifier() && !path.parentPath?.node.computed) return path.node.name;
  if (path.isStringLiteral() || path.isNumericLiteral()) return String(path.node.value);
  return undefined;
}

// 只计算很小的字面量表达式。这里的字符白名单故意收得很窄，
// 避免误执行标识符、成员访问或函数调用。
function safeEval(expr) {
  if (!/^[\d\s+\-*/%|&^~<>()!.="'`a-fA-Fxobnrtu\\]+$/.test(expr)) return undefined;
  try {
    return Function(`"use strict";return (${expr})`)();
  } catch (_) {
    return undefined;
  }
}

function normalizeLiterals(ast) {
  traverse(ast, {
    NumericLiteral(path) {
      if (path.node.extra) path.node.extra = undefined;
    },
    StringLiteral(path) {
      if (path.node.extra) path.node.extra = undefined;
    }
  });
}

// ob 经常把值打印成十六进制、unicode 转义和算术碎片。
// 先折叠这些常量，可以让后续结构匹配更稳定。
function foldSimpleConstants(ast, repeat = 2) {
  for (let i = 0; i < repeat; i++) {
    let changed = false;
    traverse(ast, {
      BinaryExpression: {
        exit(path) {
          const left = path.get('left');
          const right = path.get('right');
          if (left.isStringLiteral() && right.isStringLiteral() && path.node.operator === '+') {
            path.replaceWith(t.stringLiteral(left.node.value + right.node.value));
            changed = true;
            return;
          }
          if ((isLiteral(left.node) || left.isUnaryExpression()) && (isLiteral(right.node) || right.isUnaryExpression())) {
            const value = safeEval(compact(path.node));
            if (['number', 'string', 'boolean'].includes(typeof value)) {
              path.replaceWith(t.valueToNode(value));
              changed = true;
            }
          }
        }
      },
      UnaryExpression: {
        exit(path) {
          if (path.node.operator === '-' || path.node.operator === '+') return;
          if (!isLiteral(path.node.argument)) return;
          const value = safeEval(compact(path.node));
          if (['number', 'string', 'boolean'].includes(typeof value)) {
            path.replaceWith(t.valueToNode(value));
            changed = true;
          }
        }
      }
    });
    if (!changed) break;
  }
}

function functionNames(ast) {
  const names = new Set();
  traverse(ast, {
    FunctionDeclaration(path) {
      if (path.node.id) names.add(path.node.id.name);
    },
    VariableDeclarator(path) {
      if (!path.get('id').isIdentifier()) return;
      const init = path.get('init');
      if (init.isFunctionExpression() || init.isArrowFunctionExpression()) names.add(path.node.id.name);
    }
  });
  return names;
}

// decoder 调用经常被局部别名隐藏：
//   const f = a0_0x4a83; f(0x12, "abc")
// 统计时会追到别名根节点，这样自动识别拿到的是实际 decoder，而不是临时别名。
function callStats(ast) {
  const aliases = new Map();
  traverse(ast, {
    VariableDeclarator(path) {
      if (path.get('id').isIdentifier() && path.get('init').isIdentifier()) {
        aliases.set(path.node.id.name, path.node.init.name);
      }
    }
  });
  function rootName(name) {
    const seen = new Set();
    let cur = name;
    for (let i = 0; i < 8; i++) {
      if (!aliases.has(cur) || seen.has(cur)) return cur;
      seen.add(cur);
      cur = aliases.get(cur);
    }
    return cur;
  }
  const stats = new Map();
  traverse(ast, {
    CallExpression(path) {
      const callee = path.get('callee');
      if (!callee.isIdentifier()) return;
      const args = path.get('arguments');
      const literalCount = args.filter(arg => isLiteral(arg.node)).length;
      if (literalCount === 0) return;
      const name = rootName(callee.node.name);
      const item = stats.get(name) || { calls: 0, literalCalls: 0, arities: new Set() };
      item.calls++;
      if (literalCount === args.length) item.literalCalls++;
      item.arities.add(args.length);
      stats.set(name, item);
    }
  });
  return stats;
}

function pickDecoderNames(ast, explicit) {
  if (explicit) return explicit.split(',').map(v => v.trim()).filter(Boolean);
  const names = functionNames(ast);
  const stats = callStats(ast);
  const candidates = [];
  for (const name of names) {
    const item = stats.get(name);
    if (!item || item.literalCalls < 2) continue;
    const obLike = /^_?0x[a-f0-9]+$/i.test(name) || /^[a-z]\d_0x/i.test(name);
    candidates.push({ name, score: item.literalCalls * 10 + (obLike ? 20 : 0) });
  }
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 3).map(item => item.name);
}

function runtimeStatementKey(node) {
  return compact(node);
}

function decoderDependencyNames(ast, decoderNames) {
  const names = new Set(decoderNames);
  traverse(ast, {
    FunctionDeclaration(path) {
      const name = path.node.id?.name;
      if (!name || !decoderNames.includes(name)) return;
      for (const stmt of path.get('body.body')) {
        if (!stmt.isVariableDeclaration()) continue;
        for (const declarator of stmt.get('declarations')) {
          const init = declarator.get('init');
          if (!init.isCallExpression()) continue;
          if (init.get('arguments').length) continue;
          const callee = init.get('callee');
          if (!callee.isIdentifier()) continue;
          names.add(callee.node.name);
        }
      }
    }
  });
  return names;
}

// 构造能解字符串的最小运行时。很多 ob 文件里，数组函数、decoder 函数、
// 数组旋转 IIFE 的源码位置不等于真实执行依赖顺序，所以这里先收集函数，
// 再把旋转 IIFE 追加到后面执行。
function collectRuntime(ast, decoderNames, sourceCode = '') {
  const runtimeNames = decoderDependencyNames(ast, decoderNames);
  const functions = [];
  const initStatements = [];
  const seen = new Set();
  function pushUnique(target, node) {
    const key = runtimeStatementKey(node);
    if (seen.has(key)) return;
    seen.add(key);
    const hasRange = Number.isInteger(node.start) && Number.isInteger(node.end);
    target.push({
      node: t.cloneNode(node, true),
      raw: sourceCode && hasRange ? sourceCode.slice(node.start, node.end) : gen(node)
    });
  }
  traverse(ast, {
    Program(path) {
      const body = path.get('body');
      for (const stmt of body) {
        const text = compact(stmt.node);
        if (stmt.isFunctionDeclaration()) {
          const name = stmt.node.id?.name || '';
          if (runtimeNames.has(name)) {
            pushUnique(functions, stmt.node);
          }
          continue;
        }
        const mentionsDecoder = decoderNames.some(name => text.includes(name));
        const isRotateIife = stmt.isExpressionStatement() &&
          /while\s*\(/.test(text) && /push\(|shift\(/.test(text);
        if (mentionsDecoder && isRotateIife) pushUnique(initStatements, stmt.node);
      }
      path.stop();
    }
  });
  const entries = [...functions, ...initStatements];
  return {
    statements: entries.map(entry => entry.node),
    code: entries.map(entry => gen(entry.node)).join('\n'),
    rawCode: entries.map(entry => entry.raw).join('\n')
  };
}

// decoder 运行时通常只需要浏览器形态的全局对象和标准内置对象。
// 这里不应该执行业务代码；沙箱只用于初始化字符串数组旋转和 decoder helper。
function createSandbox() {
  const sandbox = {
    console: { log() {}, warn() {}, error() {} },
    window: {},
    globalThis: {},
    self: {},
    document: {},
    navigator: {},
    location: {},
    atob(str) {
      return Buffer.from(String(str), 'base64').toString('binary');
    },
    btoa(str) {
      return Buffer.from(String(str), 'binary').toString('base64');
    },
    decodeURIComponent,
    encodeURIComponent,
    String,
    Number,
    Boolean,
    Array,
    Object,
    Math,
    parseInt,
    parseFloat,
    RegExp,
    Date,
    JSON,
    Function
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  return sandbox;
}

// 执行收集到的 decoder 运行时，并把 decoder 函数暴露给 AST 替换流程。
// 如果运行时构造失败，调用方可以选择 strict 抛错，或退化为不解字符串的尽力处理。
function buildDecoderRuntime(code, ast, decoderNames, runtime) {
  const runtimeCode = runtime?.code || collectRuntime(ast, decoderNames).code || code;
  const sandbox = createSandbox();
  vm.createContext(sandbox);
  vm.runInContext(runtimeCode, sandbox, { timeout: 3000 });
  const decoders = {};
  for (const name of decoderNames) {
    if (typeof sandbox[name] === 'function') decoders[name] = sandbox[name].bind(sandbox);
  }
  return decoders;
}

// 在调用点解析简单局部别名。这里依赖 Babel binding 做作用域判断，
// 避免把同名但无关的全局变量错误折叠掉。
function resolveAlias(path) {
  if (!path.isIdentifier()) return undefined;
  let name = path.node.name;
  const seen = new Set();
  for (let i = 0; i < 6; i++) {
    if (!name || seen.has(name)) return name;
    seen.add(name);
    const binding = path.scope.getBinding(name);
    if (!binding || !binding.path.isVariableDeclarator()) return name;
    const init = binding.path.get('init');
    if (init.isIdentifier()) {
      name = init.node.name;
      continue;
    }
    return name;
  }
  return name;
}

// 只有当 decoder 调用的所有参数都已经是字面量时才替换。
// 这样可以保证结果确定，也避免执行任何业务表达式。
function decodeStrings(ast, decoders) {
  let count = 0;
  traverse(ast, {
    CallExpression: {
      exit(path) {
        const callee = path.get('callee');
        if (!callee.isIdentifier()) return;
        const name = resolveAlias(callee);
        const decoder = decoders[name];
        if (!decoder) return;
        const args = path.get('arguments');
        if (!args.length || !args.every(arg => isLiteral(arg.node))) return;
        try {
          const value = decoder(...args.map(arg => literalValue(arg.node)));
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            path.replaceWith(t.valueToNode(value));
            count++;
          }
        } catch (_) {}
      }
    }
  });
  return count;
}

// ob 会用对象表同时包装字符串别名和小型操作符函数：
//   var m = { a: "push", b: function(x, y) { return x + y; } }
// 这些 helper 直接从 binding 读取对象表，不依赖源码文本匹配。
function propertyMap(bindingPath) {
  if (!bindingPath || !bindingPath.isVariableDeclarator()) return null;
  const init = bindingPath.get('init');
  if (!init.isObjectExpression()) return null;
  const map = new Map();
  for (const prop of init.get('properties')) {
    if (!prop.isObjectProperty() && !prop.isObjectMethod()) continue;
    const key = keyName(prop.get('key'));
    if (key === undefined) continue;
    map.set(key, prop.isObjectMethod() ? prop : prop.get('value'));
  }
  return map;
}

// 解析对象表绑定，支持一层或多层对象别名：
//   var base = {}; var alias = base; alias["abcde"] = ...
// 后续静态对象赋值合并和对象表内联都会走这里，避免只认直接对象名。
function findObjectBindingPath(scope, name, seen = new Set()) {
  if (!name || seen.has(name)) return null;
  seen.add(name);
  const binding = scope.getBinding(name);
  if (!binding || !binding.path.isVariableDeclarator()) return null;
  const init = binding.path.get('init');
  if (init.isObjectExpression()) return binding.path;
  if (init.isIdentifier()) return findObjectBindingPath(scope, init.node.name, seen);
  return null;
}

function findObjectMap(scope, name) {
  const bindingPath = findObjectBindingPath(scope, name);
  if (!bindingPath) return null;
  return propertyMap(bindingPath);
}

function hasWriteBeforeRead(path, objectName, key) {
  const bindingPath = findObjectBindingPath(path.scope, objectName);
  if (!bindingPath) return true;
  const binding = bindingPath.scope.getBinding(bindingPath.node.id.name);
  if (!binding) return true;
  return binding.referencePaths.some(refPath => {
    if (refPath.removed || !refPath.node) return false;
    if (refPath.findParent(parent => parent.removed)) return false;
    if (refPath.node.start <= bindingPath.node.start) return false;
    if (refPath.node.start >= path.node.start) return false;
    const parent = refPath.parentPath;
    if (!parent?.isMemberExpression()) return false;
    if (parent.get('object').node !== refPath.node) return false;
    if (keyName(parent.get('property')) !== key) return false;
    const grand = parent.parentPath;
    return grand?.isAssignmentExpression({ left: parent.node }) || grand?.isUpdateExpression();
  });
}

// 统一读取包装函数的形参，兼容对象方法、普通函数表达式和箭头函数。
function wrapperParams(valuePath) {
  if (valuePath.isObjectMethod()) return valuePath.get('params');
  if (valuePath.isFunctionExpression() || valuePath.isArrowFunctionExpression()) return valuePath.get('params');
  return [];
}

// 形参替换时不能把 obj.key、对象属性 key 里的标识符当变量替换。
// 这些位置是静态属性名，应该保持原样。
function isStaticKeyPosition(parent, key) {
  return (t.isMemberExpression(parent) && key === 'property' && !parent.computed) ||
    (t.isObjectProperty(parent) && key === 'key' && !parent.computed) ||
    (t.isObjectMethod(parent) && key === 'key' && !parent.computed);
}

// 按 AST 节点递归做“形参 -> 实参”替换。
// 遇到内层函数直接克隆跳过，避免误改闭包里的同名形参或局部变量。
function substituteParams(node, paramMap, parent = null, key = '') {
  if (!node) return node;
  if (t.isIdentifier(node) && paramMap.has(node.name) && !isStaticKeyPosition(parent, key)) {
    return t.cloneNode(paramMap.get(node.name), true);
  }
  if (t.isFunction(node)) return t.cloneNode(node, true);

  const cloned = t.cloneNode(node, false);
  for (const childKey of t.VISITOR_KEYS[node.type] || []) {
    const value = node[childKey];
    if (Array.isArray(value)) {
      cloned[childKey] = value.map(child => t.isNode(child)
        ? substituteParams(child, paramMap, node, childKey)
        : child);
    } else if (t.isNode(value)) {
      cloned[childKey] = substituteParams(value, paramMap, node, childKey);
    }
  }
  return cloned;
}

// 根据包装函数形参名生成最终表达式，而不是简单按第 0、1 个实参硬拼。
// 这样 return b - a、return fn(b, a) 这类参数换位也能正确还原。
function substitutedReturn(callPath, valuePath, ret) {
  const args = callPath.node.arguments;
  const paramMap = new Map();
  for (const [index, param] of wrapperParams(valuePath).entries()) {
    if (!param.isIdentifier()) return null;
    const fallback = t.unaryExpression('void', t.numericLiteral(0), true);
    paramMap.set(param.node.name, args[index] || fallback);
  }
  return substituteParams(ret.node, paramMap);
}

// 只允许内联足够简单、语义明确的 return 表达式。
// 复杂函数体、有副作用的多语句包装器暂时保留原样。
function isSupportedWrapperReturn(ret) {
  if (ret.isBinaryExpression()) return true;
  if (ret.isLogicalExpression()) return true;
  if (ret.isCallExpression()) return true;
  if (ret.isConditionalExpression()) return true;
  if (ret.isUnaryExpression()) return true;
  return null;
}

// 从包装函数或对象方法里提取 return 表达式。
// 后续内联只处理简单单 return 包装器，复杂函数体会直接跳过。
function wrapperReturn(valuePath) {
  if (valuePath.isObjectMethod()) {
    const body = valuePath.get('body.body');
    return body.find(p => p.isReturnStatement())?.get('argument');
  }
  if (!valuePath.isFunctionExpression() && !valuePath.isArrowFunctionExpression()) return null;
  if (valuePath.get('body').isExpression()) return valuePath.get('body');
  const body = valuePath.get('body.body');
  return body.find(p => p.isReturnStatement())?.get('argument');
}

// 内联 obfuscator.io 常见包装器形态：
//   add(x, y) -> x + y
//   and(x, y) -> x && y
//   call(fn, a, b) -> fn(a, b)
// 实际替换时按包装函数形参名映射实参，所以 return y - x 这类参数换位也能还原。
// 不支持的形态会跳过，确保不破坏原始语义。
function inlineWrapperCall(callPath, valuePath) {
  const ret = wrapperReturn(valuePath);
  if (!ret || !ret.node) return false;
  if (!isSupportedWrapperReturn(ret)) return false;
  const replacement = substitutedReturn(callPath, valuePath, ret);
  if (!replacement) return false;
  callPath.replaceWith(replacement);
  return true;
}

// 内联对象表读取和对象表函数调用。这个 pass 多跑几轮是有必要的，
// 因为一次替换后可能暴露同一作用域里的下一层包装器。
function inlineObjectWrappers(ast) {
  let count = 0;
  traverse(ast, {
    MemberExpression: {
      exit(path) {
        if (path.parentPath.isCallExpression({ callee: path.node })) return;
        if (path.parentPath.isAssignmentExpression({ left: path.node })) return;
        if (path.parentPath.isUpdateExpression()) return;
        const object = path.get('object');
        if (!object.isIdentifier()) return;
        const key = keyName(path.get('property'));
        if (key === undefined) return;
        if (hasWriteBeforeRead(path, object.node.name, key)) return;
        const map = findObjectMap(path.scope, object.node.name);
        const value = map?.get(key);
        if (value && isLiteral(value.node)) {
          path.replaceWith(t.valueToNode(literalValue(value.node)));
          count++;
        }
      }
    },
    CallExpression: {
      exit(path) {
        const callee = path.get('callee');
        if (!callee.isMemberExpression()) return;
        const object = callee.get('object');
        if (!object.isIdentifier()) return;
        const key = keyName(callee.get('property'));
        if (key === undefined) return;
        if (hasWriteBeforeRead(path, object.node.name, key)) return;
        const map = findObjectMap(path.scope, object.node.name);
        const value = map?.get(key);
        if (value && inlineWrapperCall(path, value)) count++;
      }
    }
  });
  return count;
}

function inlineObjectStrings(ast) {
  let count = 0;
  traverse(ast, {
    MemberExpression: {
      exit(path) {
        if (path.parentPath.isCallExpression({ callee: path.node })) return;
        if (path.parentPath.isAssignmentExpression({ left: path.node })) return;
        if (path.parentPath.isUpdateExpression()) return;
        const object = path.get('object');
        if (!object.isIdentifier()) return;
        const key = keyName(path.get('property'));
        if (key === undefined) return;
        if (hasWriteBeforeRead(path, object.node.name, key)) return;
        const map = findObjectMap(path.scope, object.node.name);
        const value = map?.get(key);
        if (value && isLiteral(value.node)) {
          path.replaceWith(t.valueToNode(literalValue(value.node)));
          count++;
        }
      }
    }
  });
  return count;
}

function isMergeableObjectValue(path) {
  if (!path || !path.node) return false;
  if (isLiteral(path.node)) return true;
  if (path.isFunctionExpression() || path.isArrowFunctionExpression()) return true;
  return false;
}

function contiguousObjectAssignment(stmtPath, objectName) {
  if (!stmtPath?.isExpressionStatement()) return null;
  const expr = stmtPath.get('expression');
  if (!expr.isAssignmentExpression({ operator: '=' })) return null;
  const left = expr.get('left');
  if (!left.isMemberExpression()) return null;
  const object = left.get('object');
  if (!object.isIdentifier({ name: objectName })) return null;
  const key = keyName(left.get('property'));
  if (key === undefined) return null;
  const right = expr.get('right');
  if (!isMergeableObjectValue(right)) return null;
  return { key, value: right.node };
}

// 有些 ob 样本会先声明空对象，随后紧跟一段静态属性赋值。
// 只能合并“声明后连续出现”的安全赋值；遇到任何其他语句立即停止。
// 这个 pass 不能全局搬运赋值，否则会提前执行右值或改变中间读取结果。
function mergeObjectAssignments(ast) {
  let count = 0;
  traverse(ast, {
    VariableDeclarator(path) {
      const id = path.get('id');
      if (!id.isIdentifier()) return;
      const init = path.get('init');
      if (!init.isObjectExpression()) return;
      if (!path.parentPath.isVariableDeclaration()) return;
      if (path.parentPath.node.declarations.length !== 1) return;

      const declarationStmt = path.parentPath;
      if (!declarationStmt?.isStatement()) return;
      const container = declarationStmt.container;
      if (!Array.isArray(container)) return;

      const startIndex = container.indexOf(declarationStmt.node);
      if (startIndex < 0) return;

      const objectName = id.node.name;
      const seenKeys = new Set(init.get('properties').map(prop => keyName(prop.get('key'))).filter(Boolean));
      const removable = [];

      for (let i = startIndex + 1; i < container.length; i++) {
        const stmtPath = declarationStmt.getSibling(i);
        const item = contiguousObjectAssignment(stmtPath, objectName);
        if (!item) break;
        if (seenKeys.has(item.key)) break;
        seenKeys.add(item.key);
        init.node.properties.push(t.objectProperty(t.stringLiteral(item.key), t.cloneNode(item.value, true)));
        removable.push(stmtPath);
      }

      for (const stmtPath of removable) {
        stmtPath.remove();
        count++;
      }
      if (removable.length) path.scope.crawl();
    }
  });
  return count;
}

// 展平经典 obfuscator.io 派发器：
//   while (true) { switch(order[i++]) { case "0": ...; continue; } }
// 执行顺序从 split 字符串中恢复，然后按顺序直接输出每个 case 的语句。
function flattenControlFlow(ast) {
  let count = 0;
  traverse(ast, {
    WhileStatement: {
      exit(path) {
        const test = path.get('test');
        if (!(test.isBooleanLiteral({ value: true }) || test.isUnaryExpression() || test.isArrayExpression())) return;
        const block = path.get('body');
        if (!block.isBlockStatement()) return;
        const body = block.get('body');
        if (!body[0] || !body[0].isSwitchStatement()) return;
        const sw = body[0];
        const disc = sw.get('discriminant');
        if (!disc.isMemberExpression()) return;
        const arrName = disc.get('object').node.name;
        const binding = path.scope.getBinding(arrName);
        if (!binding || !binding.path.isVariableDeclarator()) return;
        const init = binding.path.get('init');
        if (!init.isCallExpression() || !init.get('callee').isMemberExpression()) return;
        const source = init.get('callee.object');
        if (!source.isStringLiteral()) return;
        const sep = init.get('arguments.0').isStringLiteral() ? init.node.arguments[0].value : '|';
        const order = source.node.value.split(sep);
        const cases = new Map();
        for (const casePath of sw.get('cases')) {
          const testPath = casePath.get('test');
          if (!testPath.node) continue;
          cases.set(String(testPath.node.value), casePath.get('consequent')
            .filter(p => !p.isContinueStatement())
            .map(p => p.node));
        }
        const out = [];
        for (const key of order) if (cases.has(key)) out.push(...cases.get(key));
        if (out.length) {
          path.replaceWithMultiple(out);
          count++;
        }
      }
    }
  });
  return count;
}

function branchStatements(branchPath) {
  if (!branchPath || !branchPath.node) return [];
  if (branchPath.isBlockStatement()) return branchPath.node.body.map(node => t.cloneNode(node, true));
  return [t.cloneNode(branchPath.node, true)];
}

// 清理常量条件分支，例如 if (true)、if ("a" === "a")。
// 这里只对字面量和纯字面量运算做静态求值，不会执行函数调用或读取变量。
function removeDeadBranches(ast, repeat = 3) {
  let total = 0;
  for (let i = 0; i < repeat; i++) {
    let count = 0;
    traverse(ast, {
      IfStatement: {
        exit(path) {
          const test = constantValue(path.get('test'));
          if (!test.confident) return;
          const branch = test.value ? path.get('consequent') : path.get('alternate');
          const nodes = branchStatements(branch);
          if (nodes.length) path.replaceWithMultiple(nodes);
          else path.remove();
          count++;
        }
      }
    });
    total += count;
    if (!count) break;
  }
  return total;
}

// 所有 decoder 调用替换完成后，再移除 helper 运行时。
// 删除范围只限已知 decoder 函数、ob 数组 helper 和旋转 IIFE；
// 不会因为业务函数里出现 decoder 名称就把业务函数删掉。
function removeDecoderRuntime(ast, decoderNames) {
  let count = 0;
  const runtimeNames = decoderDependencyNames(ast, decoderNames);
  traverse(ast, {
    Program(path) {
      const body = path.get('body');
      for (const stmt of body) {
        const text = compact(stmt.node);
        const hit = decoderNames.some(name => text.includes(name));
        const fnName = stmt.isFunctionDeclaration() ? stmt.node.id?.name || '' : '';
        const runtimeFunction = stmt.isFunctionDeclaration() && runtimeNames.has(fnName);
        const rotateIife = stmt.isExpressionStatement() && hit && /while\s*\(/.test(text) && /push\(|shift\(/.test(text);
        if (runtimeFunction || rotateIife) {
          stmt.remove();
          count++;
        }
      }
    }
  });
  return count;
}

// 清理由成功内联留下的无引用声明。
// 这里依赖 Babel binding 做保守判断，有引用的变量不会被删除。
function removeUnused(ast) {
  let count = 0;
  traverse(ast, {
    VariableDeclarator: {
      exit(path) {
        const id = path.get('id');
        if (!id.isIdentifier()) return;
        const binding = path.scope.getBinding(id.node.name);
        if (!binding || binding.referencePaths.length) return;
        path.remove();
        count++;
      }
    }
  });
  return count;
}

// 字面量 decoder 调用全部替换后，decoder 别名就没有保留价值了。
// 循环处理 b -> a -> decoder 这类别名链。
function removeDecoderAliases(ast, decoderNames) {
  const decoderSet = new Set(decoderNames);
  let count = 0;
  let changed = true;
  while (changed) {
    changed = false;
    traverse(ast, {
      VariableDeclarator(path) {
        const init = path.get('init');
        if (!init.isIdentifier() || !decoderSet.has(init.node.name)) return;
        const id = path.get('id');
        if (id.isIdentifier()) decoderSet.add(id.node.name);
        path.remove();
        count++;
        changed = true;
      }
    });
  }
  return count;
}

// 页面调试时经常还需要原始 decoder/数组函数继续服务动态调用。
// 这里把收集到的运行时原样插回文件开头，业务代码仍使用前面 pass 还原后的版本。
function prependRuntimeCode(code, runtime) {
  if (!runtime.rawCode) return code;
  return `${runtime.rawCode}\n${code}`;
}

function enabled(options, name) {
  return options[name] === true;
}

function generatorOptions(options) {
  return {
    ...(options.generator || {}),
    compact: options.compact === true || options.generator?.compact === true
  };
}

// JS 引入和 CLI 共用的核心入口。pass 顺序很关键：
// 默认只做低风险处理：字面量、decoder 字符串、对象字符串属性。
// 对象方法调用内联、控制流展平、死分支清理等可能改变执行行为的 pass 需要显式开启。
function deobfuscate(code, options = {}) {
  const originalAst = parse(code);
  const ast = parse(code);
  normalizeLiterals(ast);
  foldSimpleConstants(ast);

  const decoderNames = pickDecoderNames(ast, options.decoder);
  const runtime = collectRuntime(originalAst, decoderNames, code);
  const preserveRuntime = options.preserveRuntime !== false;
  let decoders = {};
  try {
    decoders = buildDecoderRuntime(code, ast, decoderNames, runtime);
  } catch (err) {
    if (options.strict) throw err;
  }

  const stats = {
    decoders: Object.keys(decoders),
    decodedStrings: decodeStrings(ast, decoders),
    mergedObjectAssignments: 0,
    inlinedWrappers: 0,
    flattenedFlows: 0,
    removedDeadBranches: 0,
    removedRuntime: 0,
    prependedRuntime: 0,
    removedUnused: 0
  };

  foldSimpleConstants(ast);
  if (enabled(options, 'mergeObjectAssignments')) {
    stats.mergedObjectAssignments += mergeObjectAssignments(ast);
  }
  for (let i = 0; i < 4; i++) {
    const inlined = enabled(options, 'inlineWrapperCalls')
      ? inlineObjectWrappers(ast)
      : inlineObjectStrings(ast);
    stats.inlinedWrappers += inlined;
    foldSimpleConstants(ast);
    if (!inlined) break;
  }
  if (enabled(options, 'flattenControlFlow')) {
    stats.flattenedFlows += flattenControlFlow(ast);
  }
  foldSimpleConstants(ast);
  if (enabled(options, 'removeDeadBranches')) {
    stats.removedDeadBranches += removeDeadBranches(ast);
  }
  foldSimpleConstants(ast);
  if (preserveRuntime) {
    stats.removedRuntime += removeDecoderRuntime(ast, decoderNames);
    stats.prependedRuntime = runtime.statements.length;
  } else if (!options.keepRuntime) {
    stats.removedRuntime += removeDecoderRuntime(ast, decoderNames);
    stats.removedRuntime += removeDecoderAliases(ast, decoderNames);
  }
  if (enabled(options, 'removeUnused')) {
    stats.removedUnused += removeUnused(ast);
  }
  normalizeLiterals(ast);

  const output = gen(ast, generatorOptions(options));

  return {
    code: preserveRuntime ? prependRuntimeCode(output, runtime) : output,
    stats
  };
}

// 给业务脚本用的最简入口：传入源码字符串，直接返回解混淆后的源码。
// 如果需要统计信息或更细配置，使用 ob.deobfuscate(source, options)。
function ob(code, options = {}) {
  return deobfuscate(code, options).code;
}

ob.deobfuscate = deobfuscate;
ob.parse = parse;
ob.normalizeLiterals = normalizeLiterals;
ob.foldSimpleConstants = foldSimpleConstants;
ob.decodeStrings = decodeStrings;
ob.inlineObjectWrappers = inlineObjectWrappers;
ob.inlineObjectStrings = inlineObjectStrings;
ob.flattenControlFlow = flattenControlFlow;
ob.removeDeadBranches = removeDeadBranches;

module.exports = ob;

module.exports.api = {
  deobfuscate,
  parse,
  normalizeLiterals,
  foldSimpleConstants,
  decodeStrings,
  inlineObjectWrappers,
  inlineObjectStrings,
  flattenControlFlow,
  removeDeadBranches
};
