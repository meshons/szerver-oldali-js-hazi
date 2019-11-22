let { User, Beer } = require("../../database/db");
const {validationResult} = require('express-validator');
const url = require("url");

function addBeer(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let query = {};
        errors.errors.forEach(
            error => query[error.msg] = true
        );

        res.redirect(url.format(
            {
                pathname: req.url,
                query: query
            }
        ));
        return;
    }

    User.findOne({username: req.session.user }).then(
        function (user) {
            Beer.create({
                when: Date.now(),
                where: req.body.where,
                what: req.body.what,
                liter: req.body.liter,
                user: user
            });
            next();
        }
    );
}

module.exports = addBeer;
