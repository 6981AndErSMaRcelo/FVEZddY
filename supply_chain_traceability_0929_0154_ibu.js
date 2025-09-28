// 代码生成时间: 2025-09-29 01:54:24
// Import necessary libraries and components
const axios = require('axios');
const { GraphQLClient } = require('graphql-request');

// Configuration for GraphQL endpoint and headers
const GRAPHQL_ENDPOINT = 'https://your-graphql-endpoint.com';
const HEADERS = {
  'Content-Type': 'application/json',
};

// GraphQL query for fetching supply chain data
const GET_SUPPLY_CHAIN_DATA = `
  query GetSupplyChainData($productId: ID!) {
    product(id: $productId) {
      id
      name
      manufacturer
      manufacturerLocation
      distributor
      distributorLocation
      supplier
      supplyChainDetails {
        steps {
          stepName
          stepTimestamp
          stepLocation
        }
      }
    }
  }
`;

// Function to fetch supply chain data
async function fetchSupplyChainData(productId) {
  try {
    // Create a GraphQL client
    const graphQLClient = new GraphQLClient(GRAPHQL_ENDPOINT, { headers: HEADERS });
    
    // Execute the GraphQL query
    const data = await graphQLClient.request(GET_SUPPLY_CHAIN_DATA, { productId });
    return data;
  } catch (error) {
    console.error('Error fetching supply chain data:', error.message);
    throw new Error('Failed to fetch supply chain data');
  }
}

// Function to process and display supply chain data
function displaySupplyChainData(data) {
  if (!data || !data.product) {
    console.error('Invalid or missing product data');
    return;
  }

  const product = data.product;
  console.log(`Product: ${product.name}
Manufacturer: ${product.manufacturer}
Manufacturer Location: ${product.manufacturerLocation}
Distributor: ${product.distributor}
Distributor Location: ${product.distributorLocation}
Supplier: ${product.supplier}`);

  if (product.supplyChainDetails && product.supplyChainDetails.steps) {
    console.log('Supply Chain Steps:');
    product.supplyChainDetails.steps.forEach((step, index) => {
      console.log(`Step ${index + 1}: ${step.stepName} at ${step.stepTimestamp} in ${step.stepLocation}`);
    });
  } else {
    console.log('No supply chain steps available');
  }
}

// Example usage
const productId = '12345';
fetchSupplyChainData(productId)
  .then(displaySupplyChainData)
  .catch(console.error);
