const validateEmail = email => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/;
  return regexp.test(email);
};

const validatePassword = password => {
  const letterNumber = /^[0-9a-zA-Z]+$/;
  return letterNumber.test(password) && password.length >= 8;
};

module.exports = { validateEmail, validatePassword };
