const { User } = require('../../database/db');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const url = require("url");

function login(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let query = {};
        errors.errors.forEach(
            error => query[error.msg] = true
        );

        res.redirect(url.format(
            {
                pathname: 'login',
                query: query
            }
        ));
        return;
    }

    let username = req.body.username,
        password = req.body.password;

    User.findOne({username: username }).then(function (user) {
        if (!user) {
            res.redirect('/login');
        } else if (!bcrypt.compareSync(password, user.password)) {
            res.redirect('/login');
        } else {
            req.session.user = username;
            next();
        }
    });
}

module.exports = login;
