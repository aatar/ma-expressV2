const bcrypt = require('bcryptjs');

exports.signUpMapper = body =>
  bcrypt.hash(body.password, 10).then(hashedPassword => ({
    name: body.name,
    surname: body.surname,
    email: body.email,
    password: hashedPassword
  }));
