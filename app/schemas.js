exports.userSignUp = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Missing name'
  },
  surname: {
    in: ['body'],
    isString: true,
    errorMessage: 'Missing surname'
  },
  email: {
    in: ['body'],
    isString: true,
    errorMessage: 'Missing email',
    matches: {
      options: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/,
      errorMessage: 'Email is not valid'
    }
  },
  password: {
    in: ['body'],
    isString: true,
    errorMessage: 'Missing password',
    isLength: {
      errorMessage: 'Password should be at least 8 characters long',
      options: { min: 8 }
    },
    matches: {
      options: /^[0-9a-zA-Z]+$/,
      errorMessage: 'Password must be alphanumeric'
    }
  }
};
