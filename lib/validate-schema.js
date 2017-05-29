'use strict';

var util          = require('./util'),
    ono           = require('ono'),
    ZSchema       = require('z-schema'),
    swaggerSchema = require('swagger-schema-official/schema');

module.exports = validateSchema;

initializeZSchema();

/**
 * Validates the given Swagger API against the Swagger 2.0 schema.
 *
 * @param {SwaggerObject} api
 */
function validateSchema(api, errors) {
  util.debug('Validating against the Swagger 2.0 schema');

  // Validate the API against the Swagger schema
  var isValid = ZSchema.validate(api, swaggerSchema);

  if (isValid) {
    util.debug('    Validated successfully');
  }
  else {
    console.log('>> ZSchema.getLastErrors() = ', ZSchema.getLastErrors());
    var last_errors = ZSchema.getLastErrors().map(err => getZSchemaError(err));
    errors.push(...last_errors);
  }
}

function formatErrors(errors) {

}

/**
 * Performs one-time initialization logic to prepare for Swagger Schema validation.
 */
function initializeZSchema() {
  ZSchema = new ZSchema({
    breakOnFirstError: true,
    noExtraKeywords: true,
    ignoreUnknownFormats: false,
    reportPathAsArray: true
  });
}

/**
 * Z-Schema validation errors are a nested tree structure.
 * This function crawls that tree and builds an error message structure.
 *
 * @param {object}  error     - The Z-Schema error
 * @returns {object}
 */
function getZSchemaError(error) {
  const message = `${error.message}\n${formatZSchemaError(error.inner)}`;
  return {
    path: error.path.join('/'),
    message
  }
}

/**
 * Z-Schema validation errors are a nested tree structure.
 * This function crawls that tree and builds an error message string.
 *
 * @param {object[]}  errors     - The Z-Schema error details
 * @param {string}    [indent]   - The whitespace used to indent the error message
 * @returns {string}
 */
function formatZSchemaError(errors, indent) {
  indent = indent || '  ';
  var message = '';
  errors.forEach(function(error, index) {
    message += util.format('%s%s at #/%s\n', indent, error.message, error.path.join('/'));
    if (error.inner) {
      message += formatZSchemaError(error.inner, indent + '  ');
    }
  });
  return message;
}
