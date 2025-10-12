// 代码生成时间: 2025-10-12 19:05:43
// Import necessary modules
const { graphql, useStaticQuery } = require('gatsby');

// Query to get A/B test configurations from site metadata
const abTestQuery = graphql"
  query AbTestQuery {
    site {
      siteMetadata {
        abTests {
          testId
          variants {
            variantId
            path
          }
        }
      }
    }
  }
";

// Function to choose a variant based on user session or random assignment
async function getVariant(testId, variants, userSession) {
  try {
    // Check if user has already been assigned to a variant
    if (userSession && userSession[testId]) {
      return variants.find(variant => variant.variantId === userSession[testId]);
    }

    // Randomly assign user to a variant
    const index = Math.floor(Math.random() * variants.length);
    return variants[index];
  } catch (error) {
    // Handle any errors that occur during variant selection
    console.error('Error selecting variant:', error);
    throw error;
  }
}

// Custom hook to use A/B test variant in Gatsby pages
const useAbTestVariant = (testId) => {
  const data = useStaticQuery(abTestQuery);
  const abTests = data.site.siteMetadata.abTests;
  const testConfig = abTests.find(test => test.testId === testId);

  if (!testConfig) {
    console.warn(`No A/B test found with ID: ${testId}`);
    return null;
  }

  // Assume userSession is obtained from some source, e.g., cookies or local storage
  const userSession = {}; // Replace with actual user session retrieval

  // Get the variant for the user
  const variant = getVariant(testId, testConfig.variants, userSession);

  if (!variant) {
    console.warn(`No variant found for A/B test: ${testId}`);
    return null;
  }

  return variant;
};

// Export the custom hook for use in Gatsby pages
module.exports = useAbTestVariant;