const validateEmail = email => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/;
  return regexp.test(email);
};

const validatePassword = password => {
  const letterNumber = /^[0-9a-zA-Z]+$/;
  return letterNumber.test(password) && password.length >= 8;
};

const validateArgumentsSignup = body => body.name && body.surname && body.email && body.password;

const validateArgumentsLogin = body => body.email && body.password;

module.exports = { validateEmail, validatePassword, validateArgumentsSignup, validateArgumentsLogin };
