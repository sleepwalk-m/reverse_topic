const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs')


var _0x570c = ['woDCg8Ogwo8=', 'VcOHw5Vs', 'SsK3w6cE', 'OcOAXMKZ', 'HCvCvsOj', 'KsK3eRo=', 'woFeNig=', 'wq3CscO8wpU=', 'OsKyUyk=', 'esKyw4o=', 'CMO+TA==', 'wq7CnhZJ', 'wrsiw6vDoQ==', 'w7nCjMOxOw==', 'wpVCwq3Dqg==', 'w7DDrsORdA==', 'w5nDsMKWEQ==', 'w5NGwrIN', 'E8OhdcKw', 'Qg7Dr8OO', 'Dktjw6s=', 'w53DiMO3dQ==', 'wojDmsOIwrA=', 'wovDni7CiA==', 'Q8Kvbgg=', 'w4jDjsKrw78=', 'wonCssOowpI=', 'wp9AwqPDtA==', 'wrMIw7zDgA==', 'ccK9wpbDhQ==', 'X8Kfb3I=', 'wop/JjI=', 'cmvDrns=', 'QsKmVCs=', 'XhjDs8Op', 'w6PDusO4w68=', 'UVfDp1E=', 'wpvClMOJwpo=', 'QcKrdgY=', 'N1lFAQ==', 'Q8OWw4Z2', 'wpsSQ8ON', 'D8KcUBo=', 'XsK5Qg0=', 'LMOow6s0', 'wpPDjhJw', 'wrlVFcOy', 'wqjDpG/DvQ==', 'KMOqw48C', 'w63DocOpQw==', 'w5BpfXw=', 'w6jDr8O4TA==', 'woDCs8Oqwog=', 'ccKgMi0=', 'GFnCg8KN', 'wrJJwo/DjA==', 'VsK3GhU=', 'w5jCk8OgGA==', 'XcO0wrgw', 'QHlww6E=', 'BEB2w7I=', 'JMKcfSI=', 'wq7DiAtL', 'w4cvw5MX', 'woXDgCl2', 'Qi7Dt8OO', 'csOhw4Ju', 'wrTDtiFj', 'w4PDicOuaw==', 'PcOlw7g3', 'XsK7ehI=', 'w4QJw5c2', 'w7JlW8KO', 'VsK6w5kO', 'YMOvwqQo', 'Hz57LQ==', 'KUnCpcKr', 'wpfDhGvDkw==', 'B0thw60=', 'wrAjw6bDjQ==', '6K+45rO26aue6K2y', 'RcOYwo1q', 'woZcG8O7', 'wo3DjhBx', 'w6XDscOmw60=', 'wpHDigp+', 'RcKpeSI=', 'wqXCj8OcwoE=', 'TFPDiXc=', 'SwXCo8Ku', 'wo3ClxhK', 'JcKnVR0=', 'w4UOw7UX', 'wo3CiXfDvA==', 'NMKUUi0=', 'Lw96KQ==', 'aMKaw5Mp', 'a8KZFhY=', 'wpvDnG3DhQ==', 'OkRtw7Q=', 'UcKMw4gK', 'ScKnWQc=', 'w4jDvsK8w6w=', 'wonDo8OrwpI=', 'HjvCpsOk', 'wqbCrH/DrQ==', 'wpAJacOV', 'wr/DnsO6wo0=', 'ag3DlMOV', 'wo0RecOu', 'wojCmA1+', 'w4xITsOb', 'wogNfcO5', 'DsKxSyw=', 'w4tZwo8z', 'w40lw74D', 'wqQcVMO2', 'EcKPZDo=', 'wrAkVsO/', 'w7TDsMKqw4o=', 'w5vCvsOYOA==', 'wr/CoMOpwrw=', 'QnLCg8Ku', 'Y8KIwpTDpA==', 'w5sJw5gj', 'ShTCiMKT', 'CDtEEg==', 'w4szw7gQ', 'w6czw7U3', 'H8ONT8Ko', 'wrxuCMOj', 'U8K5wofDrQ==', 'wpQAfMOI', 'w7BEwrtC', 'wqNwwobDkQ==', 'P0JmGg==', 'w696Y1w=', 'ScKrwrXDmQ==', 'SMKkHQM=', 'X8KfcA4=', 'A8OnwofDjA==', 'YMOOIcOy', 'w7Aaw74g', 'wqhUPMO4', 'wpDDnkLDvw==', 'w6PDvcO2w7Y=', 'LcO+f8KY', 'w77DlcO7Tw==', 'w741w7M+', 'fTjChsKB', 'w4gCw78r', 'GQxkEg==', 'fFHDrXA=', 'wqJOIsOg', 'IMK8dw8=', 'woTCjwpN', 'UBsnwrE=', 'wrTCm0XDmg==', 'woh5EQY=', 'woEDT8Op', 'bk3DiQ==', 'A2pIJQ==', 'NnvCp8KR', 'Cjhswow=', 'S8KuEg==', 'w6TDtsKPKg==', 'wqggQsOT', 'RjzDt8O5', 'wprCrGbDuQ==', 'woFMJi0=', 'wrvDl8OvwpA=', 'w5jDo8Kvw4w=', 'wpzClcO8wqg=', 'w4lGQUI=', 'MF/CrsK+', 'KXNQw7g=', 'w7xAwonDmw==', 'wrUIfsO7', 'w7jCuMOkJQ==', 'RFzCmMK0', 'wrPDnWvDnA==', 'esOGNw==', 'w6xqeMKq', 'U8K/QF0=', 'Zhd/wr4=', 'w7BoV1c=', 'wrQHecOf', 'V8KHUCY=', 'wrjDnMO4wo8=', 'Y8O2USE=', 'w6TDv8O0w7Q=', 'Q8OfN8Oa', 'ccK1w7jDtg==', 'wo9kFcOl'];
(function (_0x20ecdc, _0x570c71) {
    var _0x3ce331 = function (_0xf09cc9) {
        while (--_0xf09cc9) {
            _0x20ecdc['push'](_0x20ecdc['shift']());
        }
    };
    _0x3ce331(++_0x570c71);
}(_0x570c, 0xee));
var _0x3ce3 = function (_0x20ecdc, _0x570c71) {
    _0x20ecdc = _0x20ecdc - 0x0;
    var _0x3ce331 = _0x570c[_0x20ecdc];
    if (_0x3ce3['uHvhcN'] === undefined) {
        (function () {
            var _0x6afdb7 = function () {
                var _0x35ea72;
                try {
                    _0x35ea72 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                } catch (_0x3fbb7b) {
                    _0x35ea72 = window;
                }
                return _0x35ea72;
            };
            var _0x53b64a = _0x6afdb7();
            var _0x100cf5 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x53b64a['atob'] || (_0x53b64a['atob'] = function (_0x59ebb5) {
                var _0x3c892f = String(_0x59ebb5)['replace'](/=+$/, '');
                var _0x3dc83d = '';
                for (var _0x3f7515 = 0x0, _0x494b6e, _0x1eb0e6, _0x48a044 = 0x0; _0x1eb0e6 = _0x3c892f['charAt'](_0x48a044++); ~_0x1eb0e6 && (_0x494b6e = _0x3f7515 % 0x4 ? _0x494b6e * 0x40 + _0x1eb0e6 : _0x1eb0e6,
                    _0x3f7515++ % 0x4) ? _0x3dc83d += String['fromCharCode'](0xff & _0x494b6e >> (-0x2 * _0x3f7515 & 0x6)) : 0x0) {
                    _0x1eb0e6 = _0x100cf5['indexOf'](_0x1eb0e6);
                }
                return _0x3dc83d;
            }
            );
        }());
        var _0x3a5e7e = function (_0x5f34f2, _0x28e2e7) {
            var _0x5c2c82 = [], _0x3520f5 = 0x0, _0x1308fb, _0x31aa5f = '', _0x18a4ce = '';
            _0x5f34f2 = atob(_0x5f34f2);
            for (var _0x1e08c = 0x0, _0x4ec2ba = _0x5f34f2['length']; _0x1e08c < _0x4ec2ba; _0x1e08c++) {
                _0x18a4ce += '%' + ('00' + _0x5f34f2['charCodeAt'](_0x1e08c)['toString'](0x10))['slice'](-0x2);
            }
            _0x5f34f2 = decodeURIComponent(_0x18a4ce);
            var _0x3283cd;
            for (_0x3283cd = 0x0; _0x3283cd < 0x100; _0x3283cd++) {
                _0x5c2c82[_0x3283cd] = _0x3283cd;
            }
            for (_0x3283cd = 0x0; _0x3283cd < 0x100; _0x3283cd++) {
                _0x3520f5 = (_0x3520f5 + _0x5c2c82[_0x3283cd] + _0x28e2e7['charCodeAt'](_0x3283cd % _0x28e2e7['length'])) % 0x100;
                _0x1308fb = _0x5c2c82[_0x3283cd];
                _0x5c2c82[_0x3283cd] = _0x5c2c82[_0x3520f5];
                _0x5c2c82[_0x3520f5] = _0x1308fb;
            }
            _0x3283cd = 0x0;
            _0x3520f5 = 0x0;
            for (var _0x2b289d = 0x0; _0x2b289d < _0x5f34f2['length']; _0x2b289d++) {
                _0x3283cd = (_0x3283cd + 0x1) % 0x100;
                _0x3520f5 = (_0x3520f5 + _0x5c2c82[_0x3283cd]) % 0x100;
                _0x1308fb = _0x5c2c82[_0x3283cd];
                _0x5c2c82[_0x3283cd] = _0x5c2c82[_0x3520f5];
                _0x5c2c82[_0x3520f5] = _0x1308fb;
                _0x31aa5f += String['fromCharCode'](_0x5f34f2['charCodeAt'](_0x2b289d) ^ _0x5c2c82[(_0x5c2c82[_0x3283cd] + _0x5c2c82[_0x3520f5]) % 0x100]);
            }
            return _0x31aa5f;
        };
        _0x3ce3['xrNmUv'] = _0x3a5e7e;
        _0x3ce3['PsoXUd'] = {};
        _0x3ce3['uHvhcN'] = !![];
    }
    var _0xf09cc9 = _0x3ce3['PsoXUd'][_0x20ecdc];
    if (_0xf09cc9 === undefined) {
        if (_0x3ce3['VcUhTQ'] === undefined) {
            _0x3ce3['VcUhTQ'] = !![];
        }
        _0x3ce331 = _0x3ce3['xrNmUv'](_0x3ce331, _0x570c71);
        _0x3ce3['PsoXUd'][_0x20ecdc] = _0x3ce331;
    } else {
        _0x3ce331 = _0xf09cc9;
    }
    return _0x3ce331;
};
console.log(_0x570c);

let jsCode = fs.readFileSync('E:/hacker/jsproject/AST/jsl/input.js', 'utf8');
let ast = parse(jsCode);

// 进制还原
const transform_literal = {
    NumericLiteral({node}){
        if (node.extra && /^0[obx]/i.test(node.extra.raw)){
            node.extra = undefined;
        }
    },
    StringLiteral({node}){
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)){
            node.extra = undefined;
        }
    }
}
traverse(ast, transform_literal)


// 解密函数
traverse(ast,{
    CallExpression: {
        exit:function (path) {
        if(path.node.callee && path.node.callee.name === '_0x3ce3'){
            if(path.node.arguments.length == 2){
                // console.log(path.toString());
                path.replaceInline(types.stringLiteral( _0x3ce3(path.node.arguments[0].value,path.node.arguments[1].value)))
            }
        }
    }
}
})

// 字符串拼接
traverse(ast, {
    BinaryExpression: {
        exit: function (path) {
            let left = path.get("left").node.value
            let right = path.get("right").node.value
            if (path.get("left").isStringLiteral() && path.get("right").isStringLiteral()) {
                path.replaceInline(types.valueToNode(left + right))
            }
        }
    }
})

// 静态
traverse(ast, {
    AssignmentExpression: function(path) {
      const { node } = path;
      const left = node.left;
  
      if (
        types.isMemberExpression(left) &&
        types.isIdentifier(left.object) && // 确保是 `_0x17fc31['xxx']`
        types.isStringLiteral(left.property)
      ) {
        const objName = left.object.name; // 对象名
        const keyName = left.property.value; // 键名
  
        // 获取对象的绑定信息
        const binding = path.scope.getBinding(objName);
  
        if (binding && binding.path.isVariableDeclarator()) {
          const objInit = binding.path.node.init;
  
          if (types.isObjectExpression(objInit)) {
            // 添加属性到对象
            objInit.properties.push(
                types.objectProperty(types.stringLiteral(keyName), node.right)
            );

            // 移除当前赋值语句
            path.remove();
          }
        }
      }
    },
  });


  traverse(ast,{
    MemberExpression: {
        exit: function (path) {
            if(path.node.object && ['_0x13f8af','_0x3c63be','_0x2f9d84'].indexOf(path.get("object").node.name) != -1  /*&& path.parentPath.isAssignmentExpression()*/){
                // console.log(path.toString());
                let binding = path.scope.getBinding("_0x327578");
                if (path.get("object").node.name == '_0x3c63be') {
                    binding = path.scope.getBinding("_0x15f96c");
                }else if(path.get("object").node.name == '_0x9d4062'){
                    binding = path.scope.getBinding("_0x38c100");
                }


                let property = path.get("property").node.value
                let properties = binding.path.get("init.properties");
                for (let index = 0; index < properties.length; index++) {
                    const node_path = properties[index];
                    const nodeName = node_path.node.key.value;
                    if (types.isStringLiteral(node_path.get("value")) && nodeName === property) {
                        path.replaceWith(types.stringLiteral(node_path.node.value.value))
                    }
                }
            }

        }
    }
})

traverse(ast,{
    CallExpression: {
        exit: function (path) {
            if(path.node.callee.object && ['_0x13f8af','_0x3c63be','_0x2f9d84'].indexOf(path.get("callee.object").node.name) != -1 /*&& path.parentPath.isAssignmentExpression()*/){

                console.log(path.toString());
                
                let binding = path.scope.getBinding("_0x327578");
                if (path.get("callee.object").node.name == '_0x3c63be') {
                    binding = path.scope.getBinding("_0x15f96c");
                }else if(path.get("callee.object").node.name == '_0x1d1567'){
                    binding = path.scope.getBinding("_0x6e11e6");
                }



                let property = path.get("callee.property").node.value


                if (property == 'indexOf') {
                    debugger;
                }


                let properties = binding.path.get("init.properties");
                for (let index = 0; index < properties.length; index++) {
                    const node_path = properties[index];
                    const nodeName = node_path.node.key.value;
                    if (
                        nodeName === property &&
                        node_path.get('value').isFunctionExpression()
                    ) {
                        let func_bodys = node_path.get('value.body.body')
                        func_bodys = Array.from(func_bodys)
                        func_bodys.forEach(body => {
                            // 在return处才知道函数是操作符类型还是函数调用类型
                            if (body.isReturnStatement()) {
                                if (body.get('argument').isBinaryExpression()) {
                                    // 操作符还原
                                    let operator = body.get('argument.operator').node
                                    let left = path.get('arguments.0')
                                    let right = path.get('arguments.1')
                                    // console.log(path.toString(), '-->', left.toString(), operator, right.toString())
                                    path.replaceWith(types.binaryExpression(operator, left.node, right.node))
                                } else if (body.get('argument').isCallExpression()) {
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
                                } else if (body.get('argument').isLogicalExpression()) {
                                    // 操作符还原
                                    let operator = body.get('argument.operator').node
                                    let left = path.get('arguments.0')
                                    let right = path.get('arguments.1')
                                    // console.log(path.toString(), '-->', left.toString(), operator, right.toString())
                                    path.replaceWith(types.logicalExpression(operator, left.node, right.node))
                                }
                            }
                        })
                    }
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
fs.writeFile('E:/hacker/jsproject/AST/jsl/output.js', code, (err) => {
});