const userSignUp = {
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/
  },
  password: {
    type: String,
    required: true,
    length: {
      min: 8
    },
    test: /^[0-9a-zA-Z]+$/
  }
};

module.exports = { userSignUp };
