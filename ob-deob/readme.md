# ob-deob

专门处理 obfuscator.io 这一类混淆的轻量工具。

## 目录结构

- `index.js`：统一入口，外部工程直接 `require('./ob-deob')`
- `core/deobfuscator.js`：核心 AST 解混淆处理代码
- `templates/`：可直接改路径使用的模板脚本
- `ob.js`：可选命令行入口

## JS 中使用

插件内置了几份模板代码，可以直接复制后改输入输出路径：

- `templates/single-file.js`：单文件解混淆
- `templates/with-stats.js`：单文件解混淆，并打印命中统计
- `templates/batch-dir.js`：批量处理目录里的 `.js` 文件

正常使用不需要懂 AST，直接传源码字符串，返回解混淆后的源码字符串：

```js
const fs = require('fs');
const ob = require('./ob-deob');

const source = fs.readFileSync('input.js', 'utf8');
const code = ob(source);

fs.writeFileSync('output.js', code);
```

需要压缩输出时：

```js
const code = ob(source, {
  compact: true
});
```

默认是保守模式，优先保证页面能跑，只做：

- 字面量格式还原和简单常量折叠
- decoder 字符串调用替换
- 对象里的字符串属性读取还原
- 原始 decoder runtime 前置保留

下面这些 pass 默认不开，确认样本能承受后再逐个开启：

```js
const result = ob.deobfuscate(source, {
  inlineWrapperCalls: true,     // 对象方法函数调用还原，风险最高
  mergeObjectAssignments: true, // 只合并对象声明后连续的静态赋值
  flattenControlFlow: true,     // while/switch 控制流平铺
  removeDeadBranches: true,     // 常量条件死分支清理
  removeUnused: true            // 无引用变量清理
});
```

如果自动识别解密函数不准，手动指定：

```js
const code = ob(source, {
  decoder: 'a0_0x4a83'
});
```

如果需要统计信息：

```js
const result = ob.deobfuscate(source);

console.log(result.code);
console.log(result.stats);
```

## 命令行可选用法

```bash
node ob-deob/ob.js input.js -o output.js
```

压缩输出：

```bash
node ob-deob/ob.js input.js -o output.js --compact
```

## 当前覆盖

- `\xNN`、unicode、16 进制数字还原
- ob 字符串数组 + rotate + RC4/base64 解密函数调用替换
- 解密函数别名，例如 `const x = a0_0x4a83; x(0x123, 'key')`
- 对象包装器还原：
  - `obj.key` / `obj['key']` 字符串属性
  - `obj.add(a, b)` 这类二元/逻辑运算包装，需要开启 `inlineWrapperCalls`
  - `obj.call(fn, a, b)` 这类函数转发，需要开启 `inlineWrapperCalls`
- `while(true){switch(order[i++]){...}}` 控制流平铺，需要开启 `flattenControlFlow`
- `if (true)`、`if ("a" === "a")` 这类常量条件死分支清理，需要开启 `removeDeadBranches`
- 原始解密运行时代码前置保留；无引用变量清理需要开启 `removeUnused`

## 天御滑块示例

JS 引入方式可以直接参考模板。最小代码如下：

```js
const fs = require('fs');
const ob = require('../../ob-deob');

const source = fs.readFileSync('input.js', 'utf8');
const result = ob.deobfuscate(source);

fs.writeFileSync('output.ob.js', result.code);
console.log(result.stats);
```

命令行方式：

```bash
node ob-deob/ob.js \
  "360牛盾/天御滑块/input.js" \
  -o "360牛盾/天御滑块/output.ob.js"
```

输出时会在 stderr 打一行统计：

```text
[ob-deob] decoders=a0_0x4a83 decoded=... wrappers=... flows=... deadBranches=...
```

## 设计原则

这个工具只做 ob 类型，不追求所有验证码私有混淆通吃。后续遇到新的 ob 变体，优先加内置识别规则，而不是让使用者写复杂配置。