var CryptoJS = require('crypto-js')

function dynamicHash(algorithm, data) {
    try {
        // 根据算法名称选择对应的哈希函数
        const hashFunctions = {
            'md5': CryptoJS.MD5,
            'sha1': CryptoJS.SHA1,
            'sha224': CryptoJS.SHA224,
            'sha256': CryptoJS.SHA256,
            'sha384': CryptoJS.SHA384,
            'sha512': CryptoJS.SHA512,
            'sha3': CryptoJS.SHA3
        };

        if (!hashFunctions[algorithm]) {
            throw new Error(`Unsupported algorithm: ${algorithm}`);
        }

        // 计算哈希值
        const hash = hashFunctions[algorithm](data);
        return hash.toString(CryptoJS.enc.Hex); // 返回十六进制字符串
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

function getCookie(_0x52e87e) {
    _0x52e87e = JSON.parse(_0x52e87e);
    console.log(_0x52e87e);
    var _0x171118 = new Date();
    function _0x18b9db(_0x3a9f8b, _0x28ec7f) {
        var _0x15f5ed = _0x52e87e["chars"]["length"];
        for (var _0x4184d5 = 0; _0x4184d5 < _0x15f5ed; _0x4184d5++) {
            for (var _0x19da6b = 0; _0x19da6b < _0x15f5ed; _0x19da6b++) {
                var _0x44455a = _0x28ec7f[0] + _0x52e87e["chars"]["substr"](_0x4184d5, 1) + _0x52e87e["chars"]["substr"](_0x19da6b, 1) + _0x28ec7f[1];
                if (dynamicHash(_0x52e87e['ha'],_0x44455a) == _0x3a9f8b) {
                    return [_0x44455a, new Date() - _0x171118];
                }
            }
        }
    }

    var _0x41c42e = _0x18b9db(_0x52e87e['ct'], _0x52e87e["bts"]);
    console.log(_0x41c42e[0]);
    return _0x41c42e[0];
}

param = {
    "bts": ["1741572280.105|0|muv", "sjo3nn%2FimqQAhNp9X1aCuY%3D"],
    "chars": "TqPahdOXDzvVxEzQfGHK5v",
    "ct": "d38f1d26d274ebfb77ae39fda3893f0611b8256716fa6ce1a11a1bba7feaedcf",
    "ha": "sha256",
    "is": true,
    "tn": "__jsl_clearance_s",
    "vt": "3600",
    "wt": "1500"
}

param1 = {"bts":["1741586083.055|0|8CI","B7T2GJJz%2FcUdeHFkRe6pg3bg%3D"],"chars":"YSmMypDsqQ2ohC%jibqXLT","ct":"460ea567c075a1ae6961688fdfb94b90ad348834","ha":"sha1","is":true,"tn":"__jsl_clearance_s","vt":"3600","wt":"1500"}

// getCookie(param1)
getCookie('{"bts":["1741586083.055|0|8CI","B7T2GJJz%2FcUdeHFkRe6pg3bg%3D"],"chars":"YSmMypDsqQ2ohC%jibqXLT","ct":"460ea567c075a1ae6961688fdfb94b90ad348834","ha":"sha1","is":true,"tn":"__jsl_clearance_s","vt":"3600","wt":"1500"}')
