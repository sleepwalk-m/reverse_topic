const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs');
const { exit } = require('process');

// 自行将后面讲的三个特征的代码放到这
function _0x4100() {
	var _0x22aa53 = ['251985mUxIln', 'XFRJX', 'xXYDn', 'hexXor', 'CIXbb', 'aOBKg', '4480548xpuxYb', 'SqLaf', 'TPiWH', 'toString', '108cLfjrQ', '1357210Tvclfs', 'prototype', 'ssXnX', 'RBmGQ', 'XJjad', '8Pfqkyc', '344687iOhhUu', 'IRvRA', 'join', '4|1|0|3|2', '6934FoLeJQ', 'Jcwhc', '118APWSuk', '9prvDWJ', 'xFvlh', 'jPsXT', 'cBFWA', '264042HAeiXC', 'GDHNw', 'OPusJ', 'OWIJz', 'Gzpri', '3000176000856006061501533003690027800375', 'SSCjT', 'kmafh', 'hNmGu', 'PycNR', '1|0|5|3|4|2', 'EEeRc', '411631GrQOxo', 'split', 'LPvaq', 'length', '12NhGoWs', 'weDXa'];
	_0x4100 = function() {
		return _0x22aa53;
	};
	return _0x4100();
}

(function(_0x34f4dc, _0x30120e) {
	var _0x332b09 = _0x48b1,
		_0x20d748 = _0x34f4dc();
	while (!![]) {
		try {
			var _0x2b177e = -parseInt(_0x332b09(0x1b5)) / 0x1 * (parseInt(_0x332b09(0x1b3)) / 0x2) + -parseInt(_0x332b09(0x1ba)) / 0x3 * (parseInt(_0x332b09(0x19c)) / 0x4) + -parseInt(_0x332b09(0x19e)) / 0x5 + parseInt(_0x332b09(0x1a4)) / 0x6 + parseInt(_0x332b09(0x1af)) / 0x7 * (-parseInt(_0x332b09(0x1ae)) / 0x8) + parseInt(_0x332b09(0x1b6)) / 0x9 * (parseInt(_0x332b09(0x1a9)) / 0xa) + -parseInt(_0x332b09(0x1c6)) / 0xb * (-parseInt(_0x332b09(0x1a8)) / 0xc);
			if (_0x2b177e === _0x30120e) break;
			else _0x20d748['push'](_0x20d748['shift']());
		} catch (_0x24cf3c) {
			_0x20d748['push'](_0x20d748['shift']());
		}
	}
}(_0x4100, 0x6d012));

// 解密函数
function _0x48b1(_0x4a0410, _0x1abe96) {
	var _0x410075 = _0x4100();
	return _0x48b1 = function(_0x48b11a, _0x2360e1) {
		_0x48b11a = _0x48b11a - 0x19a;
		var _0x501051 = _0x410075[_0x48b11a];
		return _0x501051;
	}, _0x48b1(_0x4a0410, _0x1abe96);
}
console.log(_0x4100());


// 待反混淆的文件
let jsCode = fs.readFileSync('./AST/demo/input.js', { encoding: 'utf-8' })
let ast = parse(jsCode);

//////////////////
// 1.解密函数
traverse(ast, {
    CallExpression: {
        exit:function(path){
            if(['_0x1f7d45',"_0x7ec3d8","_0x5a71ba"].includes(path.node.callee.name)){
                // console.log(path.toString());
                // 传参_0x48b1解密函数 执行结果 替换这行代码
                path.replaceInline(types.stringLiteral(_0x48b1(path.node.arguments[0].value)))
                // console.log(path.toString());
            }
        }
    }
})


// 2.调用还原
// 2.1 先把静态属性调用还原掉，结果是字符串
traverse(ast, {
    MemberExpression:{
        exit: function (path) {
            if (path.node.object.name == "_0x554031") {
                // console.log(path.toString());
                const binding = path.scope.getBinding("_0x554031");
                // console.log(binding);
                let properties = binding.path.get("init.properties")
                for (let index = 0; index < properties.length; index++) {
                    const element = properties[index];
                    if (element.node.key.value === path.node.property.value && types.isStringLiteral(element.node.value)
                    ) {
                        path.replaceInline(types.stringLiteral(element.node.value.value))
                        break;
                    } 
                }
            }

        }
    }

})

// 2.2 函数调用
traverse(ast, {
    CallExpression: {
        exit: function (path) {
            const binding = path.scope.getBinding("_0x554031");
            if (binding) {
                let properties = binding.path.get("init.properties");
                for (let index = 0; index < properties.length; index++) {
                    const element = properties[index];
                    if (types.isMemberExpression(path.node.callee) && path.node.callee.object.name == "_0x554031" && path.node.callee.property && element.node.key.value === path.node.callee.property.value
                    ) {
                        if (types.isCallExpression(element.node.value.body.body[0].argument
                        )) {
                            // 函数调用还原
                            let origin_args = path.get('arguments')
                            origin_args = Array.from(origin_args)
                            let args
                            if (origin_args.length === 1) {
                                args = []  // 没有参数
                            } else {
                                args = origin_args.slice(1).map(arg => arg.node)
                            }
                            let old_path_string = path.toString()
                            path.replaceWith(types.callExpression(origin_args[0].node, args))
                            // console.log(old_path_string, '-->', path.toString())
                            break;
                        } else if (types.isBinaryExpression(element.node.value.body.body[0].argument
                        )) {
                            // 表达式
                            let operator = element.node.value.body.body[0].argument.operator;
                            let left = path.node.arguments[0];
                            let right = path.node.arguments[1];
                            path.replaceInline(types.binaryExpression(operator, left, right))
                            // console.log(path.toString(), '-->', left.toString(), operator, right.toString())
                            break;
                        }
                    }
                }
            }
        }
    }
})

// 去除死代码 if(false){}else{}
traverse(ast, {
    IfStatement: {
        exit: function (path) {
            if (types.isBooleanLiteral(path.node.test)) {
                console.log(path.toString());
                if (path.node.test.value) {
                    path.replaceWithMultiple(path.node.consequent.body)
                } else {
                    path.replaceWithMultiple(path.node.alternate.body)
                }
            } else if (types.isBinaryExpression(path.node.test) && types.isStringLiteral(path.node.test.left) && types.isStringLiteral(path.node.test.right)) {
                console.log(path.toString());
                const res = eval(path.get("test").toString());
                if (res) {
                    path.replaceWithMultiple(path.node.consequent.body)
                } else {
                    path.replaceWithMultiple(path.node.alternate.body)
                }
            }
        }
    }
})

// 控制流还原
let controler_code = {}
let controler = {}
traverse(ast, {
    WhileStatement: {
        exit: function (path) {
            if (
                path.get('test').isUnaryExpression() || (path.get('test').isArrayExpression() && path.get('test').toString() === '[]')
            ) {
                if (path.get('body.body').length === 0) return  // while循环体为空，直接返回
                if (path.get('body.body.0').isTryStatement()) return;// 去掉try语句
                // console.log(path.toString())
                let switch_condition
                try {
                    switch_condition = path.get('body.body.0.discriminant.object.name').node  // 控制器名称
                    // console.log(switch_condition,"====>",path.scope.getAllBindings()[switch_condition].path.toString());
                } catch (e) {
                    return
                }
                controler_code[switch_condition] = {}  // 整体代码有多个控制流，需要分开

                if (!path.scope.getAllBindings()[switch_condition].path.get('init.callee.object').isStringLiteral()) return
                // 取控制器，var _0x41a9c6 = "1|4|3|0|2"["split"]('|')
                eval(`controler['${switch_condition}'] = ` + path.scope.getAllBindings()[switch_condition].path.get('init').toString())
                let cases_path = path.get('body.body.0.cases')  // 拿到所有case节点，数组类型
                for (var i = 0; i < cases_path.length; i++) {
                    let case_num = cases_path[i].get('test.value').node  // case的值
                    controler_code[switch_condition][case_num] = []  // 控制流的代码
                    let case_content = cases_path[i].get('consequent')  // case的内容
                    case_content = Array.from(case_content)
                    case_content.forEach(c => {
                        if (!c.isContinueStatement()) {
                            // 剔除case中的continue
                            controler_code[switch_condition][case_num].push(c)
                        }
                    })
                }
                let code_node = []
                for (var i = 0; i < controler[switch_condition].length; i++) {
                    let index = controler[switch_condition][i]
                    controler_code[switch_condition][index].forEach(n => {
                        code_node.push(n.node)
                    })
                    // code_node.push(controler_code[switch_condition][index][0].node)
                }
                path.replaceWithMultiple(code_node)
            }
        }
    }
})

// 清除死代码
ast = parse(generator(ast, { compact: true }).code)
traverse(ast, {
    VariableDeclarator: {
        exit(path) {
            let { init, id } = path.node;
            if (!types.isObjectExpression(init) && !types.isIdentifier(id)) return;
            let { scope } = path;
            let binding = scope.getBinding(id.name);
            if (binding.referencePaths.length !== 0) return;
            path.remove();
        }
    }
})



//////////////////

// 语法数转JS代码
let { code } = generator(ast, { compact: false });
// console.log(code);

// 保存
fs.writeFile('./ast/demo/output.js', code, (err) => {
});