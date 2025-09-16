// 代码生成时间: 2025-09-16 22:26:59
// Import necessary modules
const axios = require('axios');
const cheerio = require('cheerio');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { NotSupportedError } = require('gatsby-core-utils');

// Define a plugin function that can be used in Gatsby's GraphQL layer
const scrapeWebContent = async (url) => {
  // Check if the URL is valid
  if (!url) {
    throw new Error('URL is required and cannot be empty.');
  }

  try {
    // Fetch the HTML content from the URL
    const response = await axios.get(url);

    // Check if the request was successful
    if (response.status !== 200) {
      throw new NotSupportedError(`Failed to fetch content from ${url}. Status: ${response.status}`);
    }

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Extract the content from the HTML (e.g., article text)
    // This is a placeholder; the actual content extraction logic will depend on the target website's structure
    const content = $('body').text().trim();

    return content;
  } catch (error) {
    // Handle any errors that occur during the scraping process
    console.error('Error scraping web content:', error.message);
    throw error;
  }
};

// Export the plugin function for use in Gatsby
module.exports = {
  scrapeWebContent,
};