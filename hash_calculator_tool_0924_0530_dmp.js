// 代码生成时间: 2025-09-24 05:30:48
const crypto = require('crypto');

// HashCalculatorTool class to provide hash calculation functionality
class HashCalculatorTool {
  /**
   * Calculate the hash of the given input string
   * @param {string} input - The input string to be hashed
   * @param {string} [algorithm='sha256'] - The hashing algorithm to use (default is 'sha256')
   * @returns {Promise<string>} - A promise that resolves to the hash of the input string
   */
  static async calculateHash(input, algorithm = 'sha256') {
    try {
      // Use crypto module to create hash of the input string
      const hash = crypto.createHash(algorithm);
      hash.update(input);
      const result = await hash.digest('hex');
      return result;
    } catch (error) {
      // Handle any errors that may occur during hashing
      throw new Error(`Error calculating hash: ${error.message}`);
    }
  }
}

// Export the HashCalculatorTool class for use in other parts of the application
module.exports = HashCalculatorTool;