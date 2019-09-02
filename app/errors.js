const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.SIGNUP_ERROR = 'signup_error';
exports.signupError = message => internalError(message, exports.SIGNUP_ERROR);

exports.SIGNIN_ERROR = 'signin_error';
exports.signinError = message => internalError(message, exports.SIGNIN_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);
