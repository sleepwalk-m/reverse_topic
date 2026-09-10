#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { deobfuscate } = require('./index');

function help() {
  console.log([
    'Usage:',
    '  node ob-deob/ob.js input.js -o output.js',
    '',
    'Options:',
    '  -o, --output       output file, omit to print to stdout',
    '  -d, --decoder      decoder function name, e.g. a0_0x4a83',
    '      --compact      compact generated business code',
    '      --keep-runtime keep ob string-array runtime in output',
    '      --strict       throw runtime execution errors'
  ].join('\n'));
}

// 命令行参数故意保持很少。大部分 obfuscator.io 样本只需要输入和输出；
// 只有自动识别无法通过字面量调用频率定位 decoder 时，才需要手动传 --decoder。
function parseArgs(argv) {
  const args = { input: null };
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (item === '-h' || item === '--help') args.help = true;
    else if (item === '-o' || item === '--output') args.output = argv[++i];
    else if (item === '-d' || item === '--decoder') args.decoder = argv[++i];
    else if (item === '--compact') args.compact = true;
    else if (item === '--keep-runtime') args.keepRuntime = true;
    else if (item === '--strict') args.strict = true;
    else if (!args.input) args.input = item;
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.input) {
  help();
  process.exit(args.help ? 0 : 1);
}

const input = path.resolve(args.input);
const source = fs.readFileSync(input, 'utf8');
const result = deobfuscate(source, args);

if (args.output) {
  const output = path.resolve(args.output);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, result.code);
} else {
  process.stdout.write(result.code);
}

// 统计信息输出到 stderr，保证 stdout 在管道模式下只保留生成后的代码。
console.error(`[ob-deob] decoders=${result.stats.decoders.join(',') || '-'} decoded=${result.stats.decodedStrings} wrappers=${result.stats.inlinedWrappers} flows=${result.stats.flattenedFlows} deadBranches=${result.stats.removedDeadBranches} runtime=${result.stats.prependedRuntime}`);