// 代码生成时间: 2025-10-12 03:56:20
const sharp = require('sharp'); // 使用sharp库进行图片处理
const fs = require('fs'); // 用于文件系统操作
const path = require('path'); // 用于路径操作

/**
 * 图片尺寸批量调整器
 * @param {string} directoryPath - 图片所在的目录
 * @param {number} targetWidth - 目标宽度
 * @param {number} targetHeight - 目标高度
 * @param {boolean} keepAspectRatio - 是否保持宽高比
 * @param {string} outputDirectory - 输出目录
 */
async function resizeImages(directoryPath, targetWidth, targetHeight, keepAspectRatio, outputDirectory) {
  try {
    // 检查输出目录是否存在，不存在则创建
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // 读取目录中的所有文件
    const files = fs.readdirSync(directoryPath);

    // 遍历文件
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.jpg' || path.extname(file).toLowerCase() === '.png') {
        const filePath = path.join(directoryPath, file);
        const outputPath = path.join(outputDirectory, file);

        // 使用sharp处理图片
        await sharp(filePath)
          .resize({
            width: targetWidth,
            height: targetHeight,
            fit: keepAspectRatio ? sharp.fit.contain : sharp.fit.cover,
            withoutEnlargement: true // 不放大图片
          })
          .toFile(outputPath)
          .then(() => console.log(`Image '${file}' resized successfully!`))
          .catch(err => console.error(`Error resizing image '${file}': ${err}`));
      }
    }
  } catch (error) {
    console.error(`Error resizing images: ${error}`);
  }
}

// 导出函数
module.exports = resizeImages;