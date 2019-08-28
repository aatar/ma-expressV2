exports.userSignUp = {
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Missing name',
      options: { min: 1 }
    }
  },
  surname: {
    in: ['body'],
    isLength: {
      errorMessage: 'Missing surname',
      options: { min: 1 }
    }
  },
  email: {
    in: ['body'],
    isLength: {
      errorMessage: 'Missing email',
      options: { min: 1 }
    },
    matches: {
      options: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/,
      errorMessage: 'Email is not valid'
    }
  },
  password: {
    in: ['body'],
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
