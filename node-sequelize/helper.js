const validateEmail = email => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@wolox.com.ar$/;
    return regexp.test(email);
}

module.exports = {validateEmail};
