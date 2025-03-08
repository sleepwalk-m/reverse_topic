const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs');
const { exit } = require('process');

// 自行将后面讲的三个特征的代码放到这
function a0_0x4b5c(){var _0x1a1fa2=['---','HmacSHA1','amd','length','HmacSHA3','592137WRpuam','addClass','_prevBlock','mouseup','clientX','_parse','loadDom','processBlock','kdf','icon-close','then','touches','explain','scrollLeft','Pkcs7','secretKey','485384sbEpVm','toString','<div\x20class=\x22verify-img-out\x22>\x0a\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-img-panel\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-refresh\x22\x20style=\x22z-index:3\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09<i\x20class=\x22iconfont\x20icon-refresh\x22></i>\x0a\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<img\x20src=\x27\x27\x20class=\x22back-img\x22\x20width=\x22','.verify-bar-area','getMousePos','back_img','none','decrypt','animate','.back-img','.verify-img-out','_append','_oKey','10px','img_width','CipherParams','parent','_keyPriorReset','offset','_doProcessBlock','_iv','imgSize','end','RC4Drop','offsetWidth','AES','</div></div></div></div>','refresh','apply','Utf16','Encryptor','setSize','\x22>\x0a\x09\x09\x09\x09\x09\x09\x09<span\x20\x20class=\x22verify-msg\x22></span>\x0a\x09\x09\x09\x09\x09\x09</div>','\x22>\x0a\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-bar-area\x22\x20style=\x22{width:','barSize','init',',height:','data:image/png;base64,','ZeroPadding','Cipher','TripleDES','<div\x20class=\x22verify-img-out\x22>\x0a\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-img-panel\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-refresh\x22\x20style=\x22z-index:3\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09<i\x20class=\x22iconfont\x20icon-refresh\x22></i>\x0a\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<span\x20class=\x22verify-tips\x22\x20\x20class=\x22suc-bg\x22></span>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<img\x20src=\x22\x22\x20class=\x22backImg\x22\x20style=\x22width:100%;height:100%;display:block\x22>\x0a\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09</div>','color','border-color','defaults','toFixed','OFB','salt','body','position','event','touchstart','endMovetime','MD5','mousedown','left_bar','post','decryptBlock','CFB','checkPosArr','Rabbit','msg','num','ivSize','unbind','#000','__creator','验证失败','addEventListener','ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=','.verify-sub-block','random','#5cb85c','block_height','resetSize','bar_height','containerId','low','EvpKDF','css','padding','_data','BufferedBlockAlgorithm','left','Base64','.verify-tips','img_height','HmacSHA224','repCode','blockPuzzle','fromCharCode','_doReset','ceil','format','clone','fast','compute','mousemove','_nDataBytes','finalize','PasswordBasedCipher','charCodeAt','sin','onclick','pad','pow','call','unpad','encrypt','SHA384','max','_lBlock','removeClass','Malformed\x20UTF-8\x20data','onselectstart','drop','DES','Iso97971','_keySchedule','ciphertext','getTime','_iKey','buffer','captchaType','BlockCipherMode','vSpace','key','mixIn','Utf8','width','_xformMode','#4cae4c','AnsiX923','SHA512','SHA1','startLeft','WordArray','clamp','mode','.verify-img-panel','HmacSHA384','_mode','Hasher','CTRGladman','blockSize','plusWidth','byteLength','_des2','pointsVerify','round','_counter','_invSubKeys','.verify-msg:eq(1)','repMsg','_doCryptBlock','_hash','.verify-msg:eq(0)','_invKeySchedule','.verify-msg','_des3','status','words','err-bg','createPoint','.verifybox-close','img_panel','algo','0px','move\x201s\x20cubic-bezier(0,\x200,\x200.39,\x201.01)','Hex','encryptBlock','ajax','#ddd','CryptoJS','success','options','baseUrl','.mask','BlockCipher','iterations','pageX','#fff','RabbitLegacy','_subKeys','231138LJEFaS','x64','CBC','top','.bock-backImg','block','1035oFQBYf','repData','_cipher','_key','icon-check','icon','update','<div\x20class=\x22mask\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verifybox\x22\x20style=\x22width:','pop','tips','clickWord','touchend','ready','icon-right','stringify','getBoundingClientRect','</span>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-left-bar\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<span\x20class=\x22verify-msg\x22></span>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20\x20class=\x22verify-move-block\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<i\x20\x20class=\x22verify-icon\x20iconfont\x20icon-right\x22></i>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verify-sub-block\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<img\x20src=\x22\x22\x20class=\x22bock-backImg\x22\x20alt=\x22\x22\x20\x20style=\x22width:100%;height:100%;display:block\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09</div>','getElementById','hasher','px\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verifybox-top\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09请完成安全验证\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<span\x20class=\x22verifybox-close\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<i\x20class=\x22iconfont\x20icon-close\x22></i>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09</span>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20class=\x22verifybox-bottom\x22\x20style=\x22padding:15px\x22>\x0a\x09\x09\x09\x09\x09\x09\x09\x09\x09\x09<div\x20style=\x22position:\x20relative;\x22>','relative','byteOffset','beforeCheck','Utf16BE',',\x27line-height\x27:','\x22\x20height=\x22','moveLeftDistance','310px','bar_area','RC4','join','high','Decryptor','PBKDF2','93615oAZKhE','_process','lengthPercent','4nyCPHC','_createHmacHelper','create','#d9534f','undefined','HmacMD5','请依次点击【','_createHelper','function','px;left:','20216acOITu','splice','block_width','50px','move_block','append','error','move','text','keySize','0000','hide','$element','HmacRIPEMD160','_rBlock','Utf16LE','abs','checkNum','display','extend','RIPEMD160','#337ab7','cfg','47103vVUbSd','slideVerify','.verify-move-block','Iso10126','push','.verify-refresh','prototype','_hasher','_des1','_map','suc-bg','find','StreamCipher','reset','SHA256','_nRounds','parse','scrollTop','indexOf','_state','string','click','clientY','_ENC_XFORM_MODE','Word','508026oLRVFd','start','_doFinalize','backToken','concat','isEnd','px;\x22>','createDecryptor','sub_block','slice','</div>','_minBufferSize','fixed','SHA224','charAt','circle_radius','ondrag','HMAC','hasOwnProperty','Base','src','SHA3','sigBytes','execute','_keystream','startMoveTime','background-color','<div\x20class=\x22verify-bar-area\x22\x20style=\x22{width:','application/json;charset=UTF-8','outputLength','circleRadius','vOffset','height','formatter','floor','htmlDoms','.verify-left-bar','lib','enc','createEncryptor'];a0_0x4b5c=function(){return _0x1a1fa2};return a0_0x4b5c()}function a0_0x361a(_0x34eeb7,_0x2bbb60){var _0x4b5ca6=a0_0x4b5c();return a0_0x361a=function(_0x361a77,_0x26f990){_0x361a77=_0x361a77-0x114;var _0x5ac224=_0x4b5ca6[_0x361a77];return _0x5ac224},a0_0x361a(_0x34eeb7,_0x2bbb60)}(function(_0x199def,_0x16e3ee){var _0x14ef7b=a0_0x361a,_0x4e5465=_0x199def();while(!![]){try{var _0x1b6033=-parseInt(_0x14ef7b(0x213))/0x1+parseInt(_0x14ef7b(0x15b))/0x2+ -parseInt(_0x14ef7b(0x14b))/0x3+parseInt(_0x14ef7b(0x23e))/0x4*(-parseInt(_0x14ef7b(0x23b))/0x5)+parseInt(_0x14ef7b(0x11e))/0x6+parseInt(_0x14ef7b(0x25f))/0x7+ -parseInt(_0x14ef7b(0x248))/0x8*(-parseInt(_0x14ef7b(0x219))/0x9);if(_0x1b6033===_0x16e3ee)break;else _0x4e5465['push'](_0x4e5465['shift']())}catch(_0x3cc530){_0x4e5465['push'](_0x4e5465['shift']())}}}(a0_0x4b5c,0x2b531))

// 待反混淆的文件
let jsCode = fs.readFileSync('./AST/sogou/input.js', { encoding: 'utf-8' })

let ast = parse(jsCode);

//////////////////


// 1. 还原字符串编码
// 解编码
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
traverse(ast, transform_literal);


// 2.解密函数
function findFinalValue(scope, identifierName) {
    const binding = scope.getBinding(identifierName);
    if (binding && binding.path.isVariableDeclarator()) {
        const init = binding.path.get('init');
        const name = init.node.name;
        if (name === "a0_0x361a") {
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
    CallExpression : {
        exit:function(path){
            if (path.node.callee.name){
                // console.log(path.toString());
                let flag = findFinalValue(path.scope, path.node.callee.name)
                if (flag) {
                    let args = path.node.arguments;
                    path.replaceInline(types.stringLiteral(a0_0x361a(args[0].value)))
                }
                
            }
        }
    }
});

// 解密函数 被多次赋值新变量 

// a = 解密函数

// b = a
// scope.getBinding(a).path.node.init.name = 解密函数



// c = b

// d = c
// path.scope.getBinding(c).path.node.init.name = b
// path.scope.getBinding(b).path.node.init.name = a
// path.scope.getBinding(a).path.node.init.name = 解密函数


// d(11)

//////////////////

// 语法数转JS代码
let { code } = generator(ast, { compact: false });

// 保存
fs.writeFile('./ast/sogou/output.js', code, (err) => {
});