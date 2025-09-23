// 代码生成时间: 2025-09-24 01:00:29
 * It checks if a given URL string is valid and follows common URL standards.
# 添加错误处理
 */

const { graphql, Link } = require('gatsby');
const isValidUrl = require('is-url'); // Using is-url npm package for validation
# 添加错误处理

// GraphQL query to fetch data from Gatsby's GraphQL
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // Modify the current page, adding a GraphQL query
  page = await graphql(
    """
    query {
# 优化算法效率
      site {
        siteMetadata {
          title
        }
      }
    }
    """
  ).then(result => {
    if (result.errors) {
      throw new Error("Error while running GraphQL query");
    }
    return result.data;
  });

  // Create a new page with the query data
# 扩展功能模块
  createPage({
    ...page,
    context: {
      ...page.context,
      ...page,
    },
  });
# 优化算法效率
};

// Utility function to validate a URL link
function validateUrl(url) {
  // Check if the URL is valid
  if (!isValidUrl(url)) {
# 添加错误处理
    // If the URL is invalid, throw an error
    throw new Error("Invalid URL provided: " + url);
  }
  // If the URL is valid, return true
  return true;
}

// Export the validateUrl function
module.exports = { validateUrl };