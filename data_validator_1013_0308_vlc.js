// 代码生成时间: 2025-10-13 03:08:56
// Import necessary modules
const { validate } = require('some-validation-library'); // Replace with an actual validation library

/**
 * Validates data against a schema.
 *
 * @param {Object} data - The data to be validated.
 * @param {Object} schema - The validation schema.
 *
 * @throws {Error} If data does not conform to the schema.
 *
 * @returns {Object} The validated data.
 */
function validateData(data, schema) {
  // Perform validation using a third-party library or custom logic
  const validationResult = validate(data, schema);

  // Check if there are any validation errors
  if (!validationResult.isValid) {
    throw new Error(`Data validation failed: ${validationResult.errors.map(error => error.message).join(', ')}`);
  }

  // Return the validated data if there are no errors
  return data;
}

/**
 * Register a Gatsby Node API to create a validation check during the build process.
 */
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createContentDigest
}) => {
  try {
    // Define your schema
    const schema = {
      // Define required fields and their types
      requiredStringField: 'string',
      optionalNumberField: 'number',
      // ... other fields and validation rules
    };

    // Obtain the node's content (if it's a file-based node)
    if (node.internal.type === 'File') {
      const content = await loadNodeContent(node);

      // Convert the content to an object if it's a JSON file
      const data = JSON.parse(content);

      // Validate the data against the schema
      validateData(data, schema);
    }
  } catch (error) {
    // Handle errors that occur during validation
    console.error(`Validation error for node ${node.id}: ${error.message}`);
    // Optionally, create a new node with an error message or adjust the node properties
  }
}

// Note: This example assumes the use of a third-party validation library.
// You would need to replace 'some-validation-library' with the actual name of a library
// that you are using and handle its specific API and validation rules accordingly.
