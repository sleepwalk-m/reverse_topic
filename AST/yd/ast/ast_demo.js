const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs')

// 解密函数
const { v, y, V, B, J, X } = require('./decode.js')
console.log(v(0xca));



let jsCode = fs.readFileSync('./AST/yd_slide/input.js', 'utf8');
let ast = parse(jsCode);

// 进制还原
const transform_literal = {
    NumericLiteral({ node }) {
        if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
    StringLiteral({ node }) {
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
            node.extra = undefined;
        }
    }
}
traverse(ast, transform_literal)


// 2.解密函数
function findFinalValue(scope, identifierName) {
    const binding = scope.getBinding(identifierName);
    if (binding && binding.path.isVariableDeclarator()) {
        const init = binding.path.get('init');
        if (init.node === null) {
            return false;
        }
        const name = init.node.name;
        if (name === "vw" || name === "v") {
            // 返回当前变量的值
            return true;
        } else {
            // 如果初始化值是另一个变量，递归查找
            return findFinalValue(scope, name);
        }
    }
    return false;
}
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (path.node.callee && path.node.callee.name) {

                var scope = path.scope;
                if (findFinalValue(scope, path.node.callee.name)) {
                    path.replaceInline(types.stringLiteral(v(path.node.arguments[0].value)))
                }
            }
        }
    }
})


// 还原数组内的调用
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (path.node.callee && ["y", "V", "B", "J", "X"].includes(path.node.callee.name)) {

                if (path.node.arguments.length == 1 && types.isStringLiteral(path.node.arguments[0])) {
                    if (["y", "B", "J", "X"].includes(path.node.callee.name)) {
                        path.replaceInline(types.stringLiteral(B(path.node.arguments[0].value)))
                    } else if (path.node.callee.name === "V") {
                        path.replaceInline(types.stringLiteral(V(path.node.arguments[0].value)))
                    }
                }
            }
        }
    }
})


traverse(ast, {
    MemberExpression: {
        exit: function (path) {
            if (path.node.object && ["P", "s", "M"].includes(path.node.object.name)) {

                if (types.isNumericLiteral(path.node.property)) {
                    const binding = path.scope.getBinding(path.node.object.name)
                    if (!types.isArrayExpression(binding.path.node.init) || binding.path.node.init.elements.length == 0) {
                        return;
                    }

                    var res = binding.path.node.init.elements[path.node.property.value]

                    path.replaceInline(res)
                }
                
            }
        }
    }
})



//////////////////

// 语法数转JS代码
let { code } = generator(ast, { compact: false });
console.log(code);
// 保存
fs.writeFile('./AST/yd_slide/output.js', code, (err) => {
});