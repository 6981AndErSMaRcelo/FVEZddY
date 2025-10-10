// 代码生成时间: 2025-10-10 18:50:36
 * This module is designed to manage social media interactions using Gatsby's capabilities.
 * It includes functions to post updates and handle errors.
 */

// Required dependencies
const axios = require('axios');

// Configuration for social media API endpoints
const { TWITTER_API_URL, FACEBOOK_API_URL } = process.env;

// Function to post an update to Twitter
async function postToTwitter(message) {
  try {
    // POST request to Twitter API
    const response = await axios.post(TWITTER_API_URL, {
      data: {
        text: message
      }
    });

    // Check if the response is successful
    if (response.status === 200) {
      console.log('Successfully posted to Twitter:', response.data);
      return response.data;
    } else {
      throw new Error('Failed to post to Twitter');
    }
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    throw error;
  }
}

// Function to post an update to Facebook
async function postToFacebook(message) {
  try {
    // POST request to Facebook API
    const response = await axios.post(FACEBOOK_API_URL, {
      data: {
        message
      }
    });

    // Check if the response is successful
    if (response.status === 200) {
      console.log('Successfully posted to Facebook:', response.data);
      return response.data;
    } else {
      throw new Error('Failed to post to Facebook');
    }
  } catch (error) {
    console.error('Error posting to Facebook:', error);
    throw error;
  }
}

// Export the functions
module.exports = {
  postToTwitter,
  postToFacebook
};