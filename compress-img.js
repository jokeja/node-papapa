const sharp = require('sharp');
const fs = require('fs');

async function compressPNG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .png({
        compressionLevel: 9,  // 最高压缩级别 (0-9)
        quality: 40,          // 质量 (1-100)
        palette: false,        // 启用调色板（有损压缩）
        //colors: 256,           // 颜色数量（配合palette）
        dither: 0.5,
        adaptiveFiltering: true,
        progressive: true
      })
      .toFile(outputPath);

    console.log(`✅ 压缩成功: ${outputPath}`);
  } catch (err) {
    console.error('❌ 压缩失败:', err);
  }
}

const directoryPath = './compress-img/';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const oldFilePath = directoryPath + file;
    const newFilePath = directoryPath + 'ori-' + file;

    fs.rename(oldFilePath, newFilePath, (error) => {
      if (error) {
        console.log('Error renaming file:', error);
      } else {
        console.log(`File ${file} renamed successfully!`);
        // 使用示例
        compressPNG(newFilePath, oldFilePath);
      }
    });
  });
});