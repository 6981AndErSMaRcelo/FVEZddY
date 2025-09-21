// 代码生成时间: 2025-09-22 02:19:36
// Import necessary modules
const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');
const { extract } = require('extract-zip');

/**
 * Decompress a file to a destination directory.
 * @param {string} sourcePath - The path to the compressed file.
 * @param {string} destinationPath - The path to extract the file to.
 * @returns {Promise<void>} - A promise that resolves when decompression is complete.
 */
async function decompressFile(sourcePath, destinationPath) {
  // Check if the file exists
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`File not found: ${sourcePath}`);
  }
  
  // Ensure the destination directory exists, create it if it doesn't
  fs.mkdirSync(destinationPath, { recursive: true });
  
  // Determine the file extension to choose the decompression method
  const extension = path.extname(sourcePath).toLowerCase();
  
  let decompressed;
  switch (extension) {
    case '.gz':
      decompressed = await gunzipFile(sourcePath, destinationPath);
      break;
    case '.zip':
      decompressed = await unzipFile(sourcePath, destinationPath);
      break;
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
  
  return decompressed;
}

/**
 * Decompress a .gz file.
 * @param {string} sourcePath - The path to the .gz file.
 * @param {string} destinationPath - The path to extract the file to.
 * @returns {Promise<string>} - The path to the decompressed file.
 */
function gunzipFile(sourcePath, destinationPath) {
  const outputPath = path.join(destinationPath, path.basename(sourcePath, '.gz'));
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(outputPath);
  const unzip = createGzip();
  
  return new Promise((resolve, reject) => {
    readStream.pipe(unzip).pipe(writeStream)
      .on('finish', () => resolve(outputPath))
      .on('error', (err) => reject(err));
  });
}

/**
 * Decompress a .zip file.
 * @param {string} sourcePath - The path to the .zip file.
 * @param {string} destinationPath - The path to extract the file to.
 * @returns {Promise<void>} - A promise that resolves when the .zip file is decompressed. */
function unzipFile(sourcePath, destinationPath) {
  return new Promise((resolve, reject) => {
    extract(sourcePath, { dir: destinationPath }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Example usage of the decompressFile function
(async () => {
  try {
    const source = 'path/to/your/file.gz';
    const destination = 'path/to/extract/to';
    await decompressFile(source, destination);
    console.log('Decompression complete.');
  } catch (error) {
    console.error('Decompression failed:', error.message);
  }
})();