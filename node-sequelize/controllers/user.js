const User = require('../models').User;
const validateEmail = require('../helper').validateEmail;
const validatePassword = require('../helper').validatePassword;

const add = (req, res) => {
    if(!validateEmail(req.body.email)) res.status(400).send("Email is not valid");
    if(!validatePassword(req.body.password)) res.status(400).send("Password must be alphanumeric and have at least 8 characters");

    return User.findAll({
        where: {
            email: req.body.email
        }
    })
    .then((user) => {
        if(user.length > 0) res.status(400).send("Email is already in use");
        return User
        .create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        })
        .then((user) => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = {
    add
};
