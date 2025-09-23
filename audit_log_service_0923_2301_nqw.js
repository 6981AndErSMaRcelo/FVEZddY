// 代码生成时间: 2025-09-23 23:01:34
const fs = require('fs');
const path = require('path');
const util = require('util');

// Promisify fs.appendFile for async usage
const appendFileAsync = util.promisify(fs.appendFile);

// AuditLogService class
class AuditLogService {
  // Constructor to initialize the audit log service with a specific file path
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
  }

  // Method to write an audit log entry
  async writeLogEntry(logEntry) {
    try {
      // Ensure the log entry is a string
      if (typeof logEntry !== 'string') {
        throw new Error('Log entry must be a string.');
      }

      // Append the log entry to the file with a timestamp and newline
      await appendFileAsync(this.logFilePath, `[${new Date().toISOString()}] ${logEntry}
`);

      console.log('Log entry written successfully.');
    } catch (error) {
      // Handle any errors that occur during the logging process
      console.error('Error writing log entry:', error.message);
    }
  }
}

// Export the AuditLogService class
module.exports = AuditLogService;
