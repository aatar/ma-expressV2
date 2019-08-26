const generateSignupError = message => ({
  message,
  internalCode: 'signup_error'
});

module.exports = { generateSignupError };
