const {User} = require('../../database/db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const url = require("url");

function registration(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let query = {};
        errors.errors.forEach(
            error => query[error.msg] = true
        );

        res.redirect(url.format(
            {
                pathname: '/registration',
                query: query
            }
        ));
        return;
    }

    let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));

    User.create({
        username: req.body.username,
        password: hash
    });

    req.session.user = req.body.username;

    next();
}

module.exports = registration;
