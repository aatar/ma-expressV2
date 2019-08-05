const User = require('../models').User;
const validateEmail = require('../helper').validateEmail;

const add = (req, res) => {
    if(!validateEmail(req.body.email)) res.status(400).send("Email is not valid");

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
