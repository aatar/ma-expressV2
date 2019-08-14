<<<<<<< 8583acaa386fc13dad664b03bab943216dbc1e1f
const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/;
const PASSWORD_REGEXP = /^[0-9a-zA-Z]+$/;
const PASSWORD_MIN_LENGTH = 8;

const EMAIL_REGEXP_ERROR = 'Email is not valid';
const PASSWORD_REGEXP_ERROR = 'Password must be alphanumeric';
const PASSWORD_MIN_LENGTH_ERROR = 'Password must be at least 8 chars long';

module.exports = {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  PASSWORD_MIN_LENGTH,
  EMAIL_REGEXP_ERROR,
  PASSWORD_REGEXP_ERROR,
  PASSWORD_MIN_LENGTH_ERROR
};
=======
const TOKEN_START = 'Bearer ';

module.exports = { TOKEN_START };
>>>>>>> finished, only missing tests
