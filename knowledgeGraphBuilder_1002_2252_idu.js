// 代码生成时间: 2025-10-02 22:52:51
const fetch = require('node-fetch');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { GraphQLScalarType, Kind } = require('graphql');

// Custom scalar type for handling dates in GraphQL schema
const DateType = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null; // Invalid hard error
  },
});

// Gatsby node API to create remote file nodes
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  // Check if the node is an instance of a remote file node
  if (node.internal.type === 'RemoteFile') {
    const fileNode = await createRemoteFileNode({
      url: node.url, // URL of the remote file
      // Additional options can be added here
      parentNodeId: node.id,
      getCache,
      createNode,
      createNodeId,
      getCache,
    });
    if (fileNode) {
      // Attach the file node to the parent node
      actions.createNodeField({
        node,
        name: 'fileNode',
        value: fileNode.id,
      });
    }
  }
};

// Gatsby node API to create schema customizations
exports.createSchemaCustomization = ({
  actions,
  schema,
}) => {
  // Add the custom Date type to the schema
  schema.buildObjectType({
    name: 'CustomDate',
    fields: {
      date: { type: DateType },
    },
  });
};

// Gatsby source nodes API to fetch data and create nodes
exports.sourceNodes = async ({ actions, createContentDigest }, configOptions) => {
  const { createNode } = actions;
  try {
    // Fetch data from a data source (e.g., an API)
    const response = await fetch(configOptions.dataSourceUrl);
    const data = await response.json();

    // Process the data to create nodes
    data.forEach((item) => {
      // Create a new node with the processed data
      const nodeContent = JSON.stringify(item);
      const nodeMeta = {
        id: createNodeId(`knowledgeGraph-${item.id}`),
        // Additional metadata can be added here
      };
      createNode({
        ...nodeMeta,
        // Parent nodes can be linked here
        // Children nodes can be linked here
        internal: {
          type: 'KnowledgeGraph', // Name of the node type
          content: nodeContent,
          contentDigest: createContentDigest(item),
        },
        data: item, // Data of the node
      });
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching data for knowledge graph:', error);
  }
};
