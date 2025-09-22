const fs = require('fs');
const { Font } = require('fonteditor-core');

// 读取字体文件
const ttfBuffer = fs.readFileSync('./fonts/ALIBABA-PUHUITI-BOLD.OTF');

// 创建字体实例
const font = Font.create(ttfBuffer, {
  type: 'otf', // 输入格式
  hinting: true // 保留 hinting 信息（可选）
});

// 转换为 WOFF 格式
const woffBuffer = font.write({
  type: 'woff', // 输出格式
});

// 保存文件
fs.writeFileSync('./fonts/converts/output.woff', woffBuffer);