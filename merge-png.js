const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
async function mergeFolderImages(inputDir, outputPath) {
  try {
    // 1. 读取文件夹中的所有图片文件
    const files = fs.readdirSync(inputDir)
      .filter(file => /\.(jpe?g|png|webp|gif|bmp|tiff)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(file => path.join(inputDir, file));

    if (files.length === 0) {
      throw new Error('文件夹中没有找到支持的图片文件');
    }

    console.log(`找到 ${files.length} 张图片:`, files.map(f => path.basename(f)).join(', '));

    // 2. 获取所有图片的元数据
    const metadataArray = await Promise.all(
      files.map(file => sharp(file).metadata())
    );

    // 3. 计算总尺寸
    const totalWidth = metadataArray.reduce((sum, meta) => sum + meta.width, 0);
    const maxHeight = Math.max(...metadataArray.map(meta => meta.height));

    // 4. 准备合成参数
    const composites = [];
    let leftOffset = 0;

    for (let i = 0; i < files.length; i++) {
      composites.push({
        input: files[i],
        left: leftOffset,
        top: Math.floor((maxHeight - metadataArray[i].height) / 2) // 垂直居中
      });
      leftOffset += metadataArray[i].width;
    }

    // 5. 创建并合成图片
    await sharp({
      create: {
        width: totalWidth,
        height: maxHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // 透明背景
      }
    })
      .composite(composites)
      .toFile(outputPath);

    console.log(`✅ 拼接完成: ${outputPath}`);
    console.log(`📏 最终尺寸: ${totalWidth} x ${maxHeight} 像素`);

    return outputPath;
  } catch (err) {
    console.error('❌ 拼接失败:', err.message);
    process.exit(1);
  }
}

// 使用示例

const inputFolder = './BOX/';  // 替换为你的图片文件夹路径
const outputFile = './merged-result.png'; // 输出文件路径

// 执行拼接
mergeFolderImages(inputFolder, outputFile);