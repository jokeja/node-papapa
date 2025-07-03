const sharp = require('sharp');

async function compressPNG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .png({
        compressionLevel: 9,  // 最高压缩级别 (0-9)
        quality: 1,          // 质量 (1-100)
        adaptiveFiltering: true, // 自适应过滤减小体积
        palette: true,        // 启用调色板（有损压缩）
        colors: 128           // 颜色数量（配合palette）
      })
      .toFile(outputPath);

    console.log(`✅ 压缩成功: ${outputPath}`);
  } catch (err) {
    console.error('❌ 压缩失败:', err);
  }
}
// 使用示例
compressPNG('event-intro.png', 'compressed-event-intro.png');