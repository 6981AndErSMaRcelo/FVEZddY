// 代码生成时间: 2025-09-23 10:18:15
const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * 将文档从一种格式转换为另一种格式
 * @param {string} sourcePath - 源文件路径
 * @param {string} targetFormat - 目标文件格式
 * @returns {Promise<void>} - 转换操作的Promise
 */
async function convertDocument(sourcePath, targetFormat) {
  try {
    // 检查文件是否存在
    await fs.access(sourcePath, fs.constants.F_OK);

    // 构建命令以执行转换
    let command;
    switch (targetFormat) {
      case 'pdf':
        command = `libreoffice --headless --convert-to ${targetFormat} ${sourcePath} --outdir .`;
        break;
      case 'docx':
        command = `soffice --convert-to ${targetFormat} ${sourcePath}`;
        break;
      default:
        throw new Error(`Unsupported format: ${targetFormat}`);
    }

    // 执行转换命令
    const { stdout, stderr } = await exec(command);
    if (stderr) throw new Error(`Conversion error: ${stderr}`);

    // 输出转换结果
    console.log(stdout);
  } catch (error) {
    console.error(`Error in convertDocument: ${error.message}`);
    throw error;
  }
}

/**
 * 获取文件扩展名
 * @param {string} filePath - 文件路径
 * @returns {string} - 文件扩展名
 */
function getFileExtension(filePath) {
  return path.extname(filePath).slice(1);
}

/**
 * 主函数，处理文档转换
 * @param {string[]} args - 命令行参数
 */
async function main(args) {
  if (args.length < 3) {
    console.error('Usage: node document_converter.js <sourcePath> <targetFormat>');
    process.exit(1);
  }

  const sourcePath = args[2];
  const targetFormat = args[3];
  const fileExtension = getFileExtension(sourcePath);

  // 检查是否支持转换
  if (!['pdf', 'docx'].includes(targetFormat)) {
    throw new Error(`Unsupported target format: ${targetFormat}`);
  }

  // 执行文档转换
  await convertDocument(sourcePath, targetFormat);
}

// 使程序可以从命令行运行
if (require.main === module) {
  main(process.argv);
}
