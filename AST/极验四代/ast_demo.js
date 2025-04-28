const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs');
const { ad, bz, ce, dt } = require('./decode.js');


// 待反混淆的文件
let jsCode = fs.readFileSync('./input.js', { encoding: 'utf-8' })

let ast = parse(jsCode);

//////////////////


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


function getMethodValue(init_name, value) {
    var res;
    switch (init_name) {
        case "_ᕶᕵᕷᖃ.$_AD":
            res = ad(value);
            break;
        case "_ᕶᕵᕷᖃ.$_Bz":
            res = bz(value);
            break;
        case "_ᕶᕵᕷᖃ.$_Ce":
            res = ce(value);
            break;
        case "_ᕶᕵᕷᖃ.$_Dt":
            res = dt(value);
            break;
    }
    return res;
}

// 2. 解密
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (types.isIdentifier(path.node.callee)) {
                // console.log(path.toString());
                // console.log(path.node.callee.name);

                if (path.node.callee.name == '$_CFAn') {
                    // debugger;
                }
                const binding = path.scope.getBinding(path.node.callee.name)

                if (!binding || !types.isVariableDeclarator(binding.path.node) || !binding.path.get("init").node) {
                    return;
                }
                // console.log(path.toString());
                const init_name = binding.path.get("init").toString()

                if (["_ᕶᕵᕷᖃ.$_AD", "_ᕶᕵᕷᖃ.$_Bz", "_ᕶᕵᕷᖃ.$_Ce", "_ᕶᕵᕷᖃ.$_Dt"].includes(init_name)) {
                    const arguments = path.node.arguments
                    if (arguments.length == 1) {
                        res = getMethodValue(init_name, arguments[0].value)
                        // console.log("替换前 ",path.toString(),"替换后 ",res.toString(),"\n");
                        path.replaceInline(types.stringLiteral(res));
                    }
                }
            }
        }
    }
})
// 3. 多层混淆的处理
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (types.isIdentifier(path.node.callee)) {
                // console.log(path.toString());
                // console.log(path.node.callee.name);

                if (path.node.callee.name == 'n') {
                    // debugger;
                }

                if (path.toString() == '_ᕵᕷᖃᖚ(_ᕹᖃᖙᖂ, _ᖗᖂᖆᖙ, _ᕷᖂᖉᖀ)') {
                    // debugger;
                }
                if (path.toString() == '_ᕿᕷᕺᖙ(578)') {
                    // debugger;
                }

                // $_CFAn(86)
                const binding = path.scope.getBinding(path.node.callee.name)

                if (!binding || !types.isVariableDeclarator(binding.path.node) || !binding.path.get("init").node || !types.isMemberExpression(binding.path.get("init").node) || !binding.path.get("init.object").node) {
                    return;
                }

                // $_CFAn = $_CEIB[1] ==> $_CEIB
                const name1 = binding.path.get("init.object.name").node
                if (!name1) {
                    return;
                }
                // $_CEIB = ['$_CFCK'].concat($_CEJJ)
                const name1_binding = path.scope.getBinding(name1);
                // console.log(path.toString());
                if (name1_binding == undefined) {
                    return;
                }
                if (!name1_binding.path.toString().includes("concat") || !types.isCallExpression(name1_binding.path.get("init").node)) {
                    return;
                }



                // $_CEJJ
                const name2 = name1_binding.path.get("init.arguments.0.name").node
                const name2_binding = path.scope.getBinding(name2);

                if (!types.isVariableDeclarator(name2_binding.path.node) || !name2_binding.path.toString().includes("_ᕶᕵᕷᖃ.$_")) {
                    return;
                }


                // zEvlF.$_CF
                const callName = name2_binding.path.get("init").toString()
                if (["_ᕶᕵᕷᖃ.$_AD", "_ᕶᕵᕷᖃ.$_Bz", "_ᕶᕵᕷᖃ.$_Ce", "_ᕶᕵᕷᖃ.$_Dt"].includes(callName)) {
                    // path.node.callee.name = callName;
                    const arguments = path.node.arguments
                    if (arguments.length == 1) {
                        res = getMethodValue(callName, arguments[0].value)
                        // console.log("替换前 ",path.toString(),"替换后 ",res.toString(),"\n");
                        path.replaceInline(types.stringLiteral(res));
                    }
                }
            }
        }
    }
})

// 特殊情况特殊处理
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            if (types.isIdentifier(path.node.callee)) {
                // console.log(path.toString());
                // console.log(path.node.callee.name);

                if (path.toString() == '_ᕿᕷᕺᖙ(578)') {
                    debugger;
                }

                if (path.node.callee.name == "_ᕶᕵᕷᖃ") {
                    // path.node.callee.name = callName;
                    const arguments = path.node.arguments;
                    if (!types.isNumericLiteral(arguments[0])) {
                        return;
                    }
                    if (arguments.length == 1) {
                        res = getMethodValue("_ᕶᕵᕷᖃ.$_Ce", arguments[0].value)
                        // console.log("替换前 ",path.toString(),"替换后 ",res.toString(),"\n");
                        path.replaceInline(types.stringLiteral(res));
                    }
                }
            }
        }
    }
})

// 语法数转JS代码
let { code } = generator(ast, { compact: false });
console.log(code)
// 保存
fs.writeFile('./output.js', code, (err) => {
});