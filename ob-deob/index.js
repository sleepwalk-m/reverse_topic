// 对外统一入口：外部项目只需要 require 整个 ob-deob 目录即可。
// 真正的 AST 解混淆实现放在 core/deobfuscator.js。
module.exports = require('./core/deobfuscator');