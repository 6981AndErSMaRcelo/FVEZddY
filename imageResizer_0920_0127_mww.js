// 代码生成时间: 2025-09-20 01:27:16
 * Features:
 * - Resize multiple images to a specified dimension.
 * - Error handling for file not found or invalid dimensions.
 * - Maintain clear code structure for easy understanding and maintenance.
 */

// Import necessary modules
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

/**
 * Function to resize an image to a specified width and height.
 * @param {string} imageFilePath - The path to the image file.
 * @param {number} newWidth - The new width for the image.
 * @param {number} newHeight - The new height for the image.
 * @param {string} outputPath - The path where the resized image will be saved.
 * @returns {Promise<void>} - A promise that resolves when the image is resized or rejects on error.
 */
async function resizeImage(imageFilePath, newWidth, newHeight, outputPath) {
  try {
    // Ensure the file exists before attempting to resize
    if (!await fileExists(imageFilePath)) {
      throw new Error(`File not found: ${imageFilePath}`);
    }

    // Use sharp to resize the image
    await sharp(imageFilePath)
      .resize(newWidth, newHeight)
      .toFile(outputPath);

    console.log(`Image resized and saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error resizing image: ${error.message}`);
    throw error; // Re-throw the error for further handling by the caller
  }
}

/**
 * Function to check if a file exists at a given path.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} - A promise that resolves to true if the file exists, false otherwise.
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Function to batch resize images in a directory.
 * @param {string} directoryPath - The path to the directory containing images to resize.
 * @param {number} newWidth - The new width for the images.
 * @param {number} newHeight - The new height for the images.
 * @param {string} outputDirectory - The directory where resized images will be saved.
 * @returns {Promise<void>} - A promise that resolves when all images are resized or rejects on error.
 */
async function batchResizeImages(directoryPath, newWidth, newHeight, outputDirectory) {
  // Validate input dimensions
  if (newWidth <= 0 || newHeight <= 0) {
    throw new Error('Invalid dimensions provided for resizing.');
  }

  // Ensure output directory exists
  await ensureDirectory(outputDirectory);

  try {
    // Read all image files from the directory
    const imageFiles = await getImageFiles(directoryPath);

    // Resize each image and save to the output directory
    for (const imageFile of imageFiles) {
      const outputPath = path.join(outputDirectory, path.basename(imageFile));
      await resizeImage(imageFile, newWidth, newHeight, outputPath);
    }
  } catch (error) {
    console.error(`Error batch resizing images: ${error.message}`);
    throw error; // Re-throw the error for further handling by the caller
  }
}

/**
 * Function to ensure a directory exists, creating it if necessary.
 * @param {string} directoryPath - The path to the directory.
 * @returns {Promise<void>} - A promise that resolves when the directory is ensured to exist.
 */
async function ensureDirectory(directoryPath) {
  try {
    await fs.mkdir(directoryPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Function to retrieve all image files from a directory.
 * @param {string} directoryPath - The path to the directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of image file paths.
 */
async function getImageFiles(directoryPath) {
  const files = await fs.readdir(directoryPath);
  return files.filter(file => file.match(/\.(jpg|jpeg|png|gif|svg)$/i)).map(file => path.join(directoryPath, file));
}

// Example usage:
// batchResizeImages('./images', 800, 600, './resizedImages')
//   .then(() => console.log('All images have been resized successfully.'))
//   .catch(error => console.error('Failed to resize images:', error.message));
