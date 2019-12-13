let { User, Beer } = require("../../database/db");

function listBeers(req, res, next) {
    User.findOne({username: req.session.user }).then(
        function (user) {
            Beer.find({ user: user }, function (err, beers) {
                res.locals.beers = beers;
                next();
            })
        }
    );
}

module.exports = listBeers;
