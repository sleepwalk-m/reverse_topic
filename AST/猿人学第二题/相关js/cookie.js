// 最终的js代码
window = global;
document = {};
navigator  = {};
history    = {};
location   = {};

function getCookie(_0x2e0139) {
  debugger;
  var _0x4286e0 = function () {
    var _0x4c3449 = !![];
    return function (_0x3361ff, _0x4438b2) {
      var _0x2d02b5 = _0x4c3449 ? function () {
        if (_0x4438b2) {
          var _0x273f8c = _0x4438b2["apply"](_0x3361ff, arguments);
          _0x4438b2 = null;
          return _0x273f8c;
        }
      } : function () {};
      _0x4c3449 = ![];
      return _0x2d02b5;
    };
  }();
  var _0x81b87a = function () {
    var _0x37e851 = !![];
    return function (_0x5e48cc, _0x143e9c) {
      var _0x1db571 = _0x37e851 ? function () {
        if (_0x143e9c) {
          var _0x4d90cb = _0x143e9c["apply"](_0x5e48cc, arguments);
          _0x143e9c = null;
          return _0x4d90cb;
        }
      } : function () {};
      _0x37e851 = ![];
      return _0x1db571;
    };
  }();
  function _0xcb9ebe(_0x11d938, _0x2849dd) {
    var _0x248351 = (65535 & _0x11d938) + (65535 & _0x2849dd);
    return (_0x11d938 >> 16) + (_0x2849dd >> 16) + (_0x248351 >> 16) << 16 | 65535 & _0x248351;
  }
  function _0x501a8d(_0x596666, _0x215ed5) {
    return _0x596666 << _0x215ed5 | _0x596666 >>> 32 - _0x215ed5;
  }
  function _0x3715af(_0x236024, _0x208e98, _0x217940, _0x49472b, _0x337db8, _0x3023e2) {
    return _0xcb9ebe(_0x501a8d(_0xcb9ebe(_0xcb9ebe(_0x208e98, _0x236024), _0xcb9ebe(_0x49472b, _0x3023e2)), _0x337db8), _0x217940);
  }
  function _0x4400d0(_0x3679d2, _0x331a46, _0x5143c2, _0x556481, _0x1c85a2, _0x5ba049, _0x2ba223) {
    return _0x3715af(_0x331a46 & _0x5143c2 | ~_0x331a46 & _0x556481, _0x3679d2, _0x331a46, _0x1c85a2, _0x5ba049, _0x2ba223);
  }
  function _0x5c9cbf(_0x67e978, _0x1cb766, _0xe0669b, _0x44c421, _0x458bc5, _0x2d9461, _0x34fdb8) {
    return _0x3715af(_0x1cb766 & _0x44c421 | _0xe0669b & ~_0x44c421, _0x67e978, _0x1cb766, _0x458bc5, _0x2d9461, _0x34fdb8);
  }
  function _0x3ecaa9(_0x130eea, _0x4fb503) {
    let _0x117583 = [99, 111, 110, 115, 111, 108, 101];
    let _0x1b9874 = '';
    for (let _0x9d2025 = 0; _0x9d2025 < _0x117583["length"]; _0x9d2025++) {
      _0x1b9874 += String["fromCharCode"](_0x117583[_0x9d2025]);
    }
    return _0x1b9874;
  }
  function _0x20ae4c(_0x55c799, _0x3e4875, _0x35de9c, _0x24665e, _0x4e200f, _0x380ccf, _0xc3ea74) {
    return _0x3715af(_0x3e4875 ^ _0x35de9c ^ _0x24665e, _0x55c799, _0x3e4875, _0x4e200f, _0x380ccf, _0xc3ea74);
  }
  function _0x22515e(_0x8bb68b, _0x49e005, _0x7da3f6, _0x3f4976, _0x728ccc, _0x337a99, _0x3e0c35) {
    return _0x3715af(_0x7da3f6 ^ (_0x49e005 | ~_0x3f4976), _0x8bb68b, _0x49e005, _0x728ccc, _0x337a99, _0x3e0c35);
  }
  function _0xec0e87(_0x214db6, _0xcfbc64) {
    if (_0xcfbc64) {
      return _0x22515e(_0x214db6);
    }
    return _0x3ecaa9(_0x214db6);
  }
  function _0x330e28(_0x1bb1b7, _0x2ce478) {
    let _0x8e059e = '';
    for (let _0x4f4580 = 0; _0x4f4580 < _0x1bb1b7["length"]; _0x4f4580++) {
      _0x8e059e += String["fromCharCode"](_0x1bb1b7[_0x4f4580]);
    }
    return _0x8e059e;
  }
  function _0x24b5c6(_0x4776cf, _0x5c7082) {
    // var _0x5624d4 = _0x4286e0(this, function () {
    //   var _0x49ea55 = function () {
    //     var _0xfe603d = _0x49ea55["constructor"]("return /\" + this + \"/")()["compile"]("^([^ ]+( +[^ ]+)+)+[^ ]}");
    //     return !_0xfe603d["test"](_0x5624d4);
    //   };
    //   return _0x49ea55();
    // });
    // _0x5624d4();

    _0xec0e87();
    qz = [10, 99, 111, 110, 115, 111, 108, 101, 32, 61, 32, 110, 101, 119, 32, 79, 98, 106, 101, 99, 116, 40, 41, 10, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 32, 61, 32, 102, 117, 110, 99, 116, 105, 111, 110, 32, 40, 115, 41, 32, 123, 10, 32, 32, 32, 32, 119, 104, 105, 108, 101, 32, 40, 49, 41, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 102, 111, 114, 40, 105, 61, 48, 59, 105, 60, 49, 49, 48, 48, 48, 48, 48, 59, 105, 43, 43, 41, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 104, 105, 115, 116, 111, 114, 121, 46, 112, 117, 115, 104, 83, 116, 97, 116, 101, 40, 48, 44, 48, 44, 105, 41, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 125, 10, 10, 125, 10, 99, 111, 110, 115, 111, 108, 101, 46, 116, 111, 83, 116, 114, 105, 110, 103, 32, 61, 32, 39, 91, 111, 98, 106, 101, 99, 116, 32, 79, 98, 106, 101, 99, 116, 93, 39, 10, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 46, 116, 111, 83, 116, 114, 105, 110, 103, 32, 61, 32, 39, 402, 32, 116, 111, 83, 116, 114, 105, 110, 103, 40, 41, 32, 123, 32, 91, 110, 97, 116, 105, 118, 101, 32, 99, 111, 100, 101, 93, 32, 125, 39, 10];
    // eval(_0x330e28(qz));
    
  }
  function _0x1c581c(_0x1768c9, _0x2f57eb) {
    _0x1768c9[_0x2f57eb >> 5] |= 128 << _0x2f57eb % 32, _0x1768c9[14 + (_0x2f57eb + 64 >>> 9 << 4)] = _0x2f57eb;
    if (qz) {
      var _0x37c17f,
        _0x300370,
        _0x172a09,
        _0x4810fc,
        _0x57317d,
        _0x31c43b = 1732584193,
        _0x5f46d2 = -271733879,
        _0x2e07f6 = -1732584194,
        _0x4fb477 = 271733878;
    } else {
      var _0x37c17f,
        _0x300370,
        _0x172a09,
        _0x4810fc,
        _0x57317d,
        _0x31c43b = 0,
        _0x5f46d2 = -0,
        _0x2e07f6 = -0,
        _0x4fb477 = 0;
    }
    for (_0x37c17f = 0; _0x37c17f < _0x1768c9["length"]; _0x37c17f += 16) _0x300370 = _0x31c43b, _0x172a09 = _0x5f46d2, _0x4810fc = _0x2e07f6, _0x57317d = _0x4fb477, _0x31c43b = _0x4400d0(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f], 7, -680876936), _0x4fb477 = _0x4400d0(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 1], 12, -389564586), _0x2e07f6 = _0x4400d0(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 2], 17, 606105819), _0x5f46d2 = _0x4400d0(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 3], 22, -1044525330), _0x31c43b = _0x4400d0(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 4], 7, -176418897), _0x4fb477 = _0x4400d0(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 5], 12, 1200080426), _0x2e07f6 = _0x4400d0(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 6], 17, -1473231341), _0x5f46d2 = _0x4400d0(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 7], 22, -45705983), _0x31c43b = _0x4400d0(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 8], 7, 1770010416), _0x4fb477 = _0x4400d0(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 9], 12, -1958414417), _0x2e07f6 = _0x4400d0(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 10], 17, -42063), _0x5f46d2 = _0x4400d0(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 11], 22, -1990404162), _0x31c43b = _0x4400d0(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 12], 7, 1804603682), _0x4fb477 = _0x4400d0(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 13], 12, -40341101), _0x2e07f6 = _0x4400d0(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 14], 17, -1502882290), _0x5f46d2 = _0x4400d0(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 15], 22, 1236535329), _0x31c43b = _0x5c9cbf(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 1], 5, -165796510), _0x4fb477 = _0x5c9cbf(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 6], 9, -1069501632), _0x2e07f6 = _0x5c9cbf(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 11], 14, 643717713), _0x5f46d2 = _0x5c9cbf(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f], 20, -373897302), _0x31c43b = _0x5c9cbf(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 5], 5, -701558691), _0x4fb477 = _0x5c9cbf(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 10], 9, 38016083), _0x2e07f6 = _0x5c9cbf(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 15], 14, -660478335), _0x5f46d2 = _0x5c9cbf(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 4], 20, -405537848), _0x31c43b = _0x5c9cbf(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 9], 5, 568446438), _0x4fb477 = _0x5c9cbf(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 14], 9, -1019803690), _0x2e07f6 = _0x5c9cbf(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 3], 14, -187363961), _0x5f46d2 = _0x5c9cbf(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 8], 20, 1163531501), _0x31c43b = _0x5c9cbf(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 13], 5, -1444681467), _0x4fb477 = _0x5c9cbf(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 2], 9, -51403784), _0x2e07f6 = _0x5c9cbf(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 7], 14, 1735328473), _0x5f46d2 = _0x5c9cbf(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 12], 20, -1926607734), _0x31c43b = _0x20ae4c(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 5], 4, -378558), _0x4fb477 = _0x20ae4c(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 8], 11, -2022574463), _0x2e07f6 = _0x20ae4c(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 11], 16, 1839030562), _0x5f46d2 = _0x20ae4c(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 14], 23, -35309556), _0x31c43b = _0x20ae4c(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 1], 4, -1530992060), _0x4fb477 = _0x20ae4c(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 4], 11, 1272893353), _0x2e07f6 = _0x20ae4c(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 7], 16, -155497632), _0x5f46d2 = _0x20ae4c(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 10], 23, -1094730640), _0x31c43b = _0x20ae4c(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 13], 4, 681279174), _0x4fb477 = _0x20ae4c(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f], 11, -358537222), _0x2e07f6 = _0x20ae4c(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 3], 16, -722521979), _0x5f46d2 = _0x20ae4c(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 6], 23, 76029189), _0x31c43b = _0x20ae4c(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 9], 4, -640364487), _0x4fb477 = _0x20ae4c(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 12], 11, -421815835), _0x2e07f6 = _0x20ae4c(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 15], 16, 530742520), _0x5f46d2 = _0x20ae4c(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 2], 23, -995338651), _0x31c43b = _0x22515e(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f], 6, -198630844), _0x4fb477 = _0x22515e(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 7], 10, 1126891415), _0x2e07f6 = _0x22515e(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 14], 15, -1416354905), _0x5f46d2 = _0x22515e(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 5], 21, -57434055), _0x31c43b = _0x22515e(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 12], 6, 1700485571), _0x4fb477 = _0x22515e(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 3], 10, -1894986606), _0x2e07f6 = _0x22515e(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 10], 15, -1051523), _0x5f46d2 = _0x22515e(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 1], 21, -2054922799), _0x31c43b = _0x22515e(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 8], 6, 1873313359), _0x4fb477 = _0x22515e(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 15], 10, -30611744), _0x2e07f6 = _0x22515e(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 6], 15, -1560198380), _0x5f46d2 = _0x22515e(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 13], 21, 1309151649), _0x31c43b = _0x22515e(_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477, _0x1768c9[_0x37c17f + 4], 6, -145523070), _0x4fb477 = _0x22515e(_0x4fb477, _0x31c43b, _0x5f46d2, _0x2e07f6, _0x1768c9[_0x37c17f + 11], 10, -1120210379), _0x2e07f6 = _0x22515e(_0x2e07f6, _0x4fb477, _0x31c43b, _0x5f46d2, _0x1768c9[_0x37c17f + 2], 15, 718787259), _0x5f46d2 = _0x22515e(_0x5f46d2, _0x2e07f6, _0x4fb477, _0x31c43b, _0x1768c9[_0x37c17f + 9], 21, -343485441), _0x31c43b = _0xcb9ebe(_0x31c43b, _0x300370), _0x5f46d2 = _0xcb9ebe(_0x5f46d2, _0x172a09), _0x2e07f6 = _0xcb9ebe(_0x2e07f6, _0x4810fc), _0x4fb477 = _0xcb9ebe(_0x4fb477, _0x57317d);
    return [_0x31c43b, _0x5f46d2, _0x2e07f6, _0x4fb477];
  }
  function _0xb16e0(_0x4eed1f) {
    var _0x41f0a7,
      _0x2efe14 = '',
      _0x36ef8e = 32 * _0x4eed1f["length"];
    for (_0x41f0a7 = 0; _0x41f0a7 < _0x36ef8e; _0x41f0a7 += 8) _0x2efe14 += String["fromCharCode"](_0x4eed1f[_0x41f0a7 >> 5] >>> _0x41f0a7 % 32 & 255);
    return _0x2efe14;
  }
  function _0x577e5d(_0x470efa) {
    var _0x1f715d,
      _0x542910 = [];
    for (_0x542910[(_0x470efa["length"] >> 2) - 1] = void 0, _0x1f715d = 0; _0x1f715d < _0x542910["length"]; _0x1f715d += 1) _0x542910[_0x1f715d] = 0;
    var _0x5a882b = 8 * _0x470efa["length"];
    for (_0x1f715d = 0; _0x1f715d < _0x5a882b; _0x1f715d += 8) _0x542910[_0x1f715d >> 5] |= (255 & _0x470efa["charCodeAt"](_0x1f715d / 8)) << _0x1f715d % 32;
    return _0x542910;
  }
  function _0x46cc28(_0x3fb099) {
    return _0xb16e0(_0x1c581c(_0x577e5d(_0x3fb099), 8 * _0x3fb099["length"]));
  }
  function _0x2d52d6(_0x32d34f) {
    var _0x3f06b0,
      _0x2441f2,
      _0xb98be4 = "0123456789abcdef",
      _0x5f16ed = '';
    for (_0x2441f2 = 0; _0x2441f2 < _0x32d34f["length"]; _0x2441f2 += 1) _0x3f06b0 = _0x32d34f["charCodeAt"](_0x2441f2), _0x5f16ed += _0xb98be4["charAt"](_0x3f06b0 >>> 4 & 15) + _0xb98be4["charAt"](15 & _0x3f06b0);
    return _0x5f16ed;
  }
  function _0x222dae(_0x394e89) {
    return unescape(encodeURIComponent(_0x394e89));
  }
  function _0x12df0c(_0xf44d34) {
    return _0x46cc28(_0x222dae(_0xf44d34));
  }
  function _0x3477ca(_0x13ef11) {
    return _0x2d52d6(_0x12df0c(_0x13ef11));
  }
  function _0xb54724(_0x1ec900, _0x4f8b13, _0x275b1f) {
    _0x24b5c6();
    return _0x4f8b13 ? _0x275b1f ? _0x3ecaa9(_0x4f8b13, _0x1ec900) : y(_0x4f8b13, _0x1ec900) : _0x275b1f ? _0x12df0c(_0x1ec900) : _0x3477ca(_0x1ec900);
  }
  function _0x1c7245(_0x475a0b, _0x455c2d) {
    debugger;
    cookie = 'm' + '=' + _0xb54724(_0x475a0b) + '|' + _0x475a0b;
    return cookie;
  }
  function _0x4c2c35(_0x157e00, _0xf51fd1) {
    return Date["parse"](new Date());
  }
  debugger;
  var ress = _0x1c7245(_0x4c2c35());
  console.log(ress);
  return ress;
}

console.log(getCookie());
