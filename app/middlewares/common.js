const { checkSchema } = require('express-validator');

exports.validateSchema = schema => checkSchema(schema);
