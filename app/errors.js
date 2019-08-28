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

exports.CONFLICT_ERROR = 'conflict_error';
exports.conflictError = message => internalError(message, exports.CONFLICT_ERROR);
