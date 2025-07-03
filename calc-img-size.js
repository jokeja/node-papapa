const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

// 支持的图片格式
const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

// 获取命令行参数
const targetDir = './img-log';

// 结果存储
const results = [];
let successCount = 0;
let errorCount = 0;

try {
  // 读取目录内容
  const files = fs.readdirSync(targetDir);

  // 处理每个文件
  files.forEach(file => {
    const filePath = path.join(targetDir, file);
    const stats = fs.statSync(filePath);

    // 跳过目录
    if (stats.isDirectory()) return;

    // 检查文件格式
    const ext = path.extname(file).toLowerCase().slice(1);
    if (!SUPPORTED_FORMATS.includes(ext)) return;

    try {
      // 获取图片尺寸
      const buffer = fs.readFileSync(filePath);
      const dimensions = imageSize(buffer);
      results.push({
        file,
        width: dimensions.width,
        height: dimensions.height
      });
      successCount++;
    } catch (err) {
      errorCount++;
      console.error(`× 处理失败: ${file.padEnd(30)} ${err.message}`);
    }
  });

  // 显示结果
  console.log('\n图片尺寸统计结果：');
  let jsonObj = {}
  results.forEach(({ file, width, height }) => {
    jsonObj[file] = { x: 0, y: 0, width, height };
  })
  console.log(JSON.stringify(jsonObj, null, 2));
  // results.forEach(({ file, width, height }) => {
  //   console.log(`✓ ${file.padEnd(30)} ${width}x${height}`);
  // });

  // 显示统计信息
  console.log('\n统计信息：');
  console.log(`扫描目录：${targetDir}`);
  console.log(`发现图片：${results.length + errorCount} 个`);
  console.log(`成功处理：${successCount} 个`);
  console.log(`失败处理：${errorCount} 个`);

} catch (err) {
  console.error('错误：', err.message);
}