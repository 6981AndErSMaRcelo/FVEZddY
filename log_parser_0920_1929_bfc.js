// 代码生成时间: 2025-09-20 19:29:39
// log_parser.js

// 导入必要的Node.js模块
const fs = require('fs');
const path = require('path');

// 解析日志文件的函数
function parseLogFile(logFilePath) {
  // 检查文件路径是否存在
  if (!fs.existsSync(logFilePath)) {
    throw new Error(`日志文件 ${logFilePath} 不存在。`);
  }

  // 读取日志文件内容
  const logContent = fs.readFileSync(logFilePath, 'utf8');

  // 定义日志条目的正则表达式模式
  const logEntryPattern = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) - (INFO|WARNING|ERROR) - (.*)$/;

  // 使用正则表达式分割日志内容
  const logEntries = logContent.split('
').filter(line => line !== '').map(line => {
    const match = logEntryPattern.exec(line.trim());
    if (match) {
      return {
        timestamp: match[1],
        level: match[2],
        message: match[3]
      };
    }
    return null;
  }).filter(entry => entry !== null);

  // 返回解析后的日志条目数组
  return logEntries;
}

// 导出 parseLogFile 函数供其他模块使用
module.exports = {
  parseLogFile
};