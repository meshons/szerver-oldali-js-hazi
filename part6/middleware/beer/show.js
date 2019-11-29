let { Beer } = require("../../database/db");


function showBeer(req, res, next) {
    Beer.findById(req.params.id,
        function (err, beer) {
            res.locals.beer = beer;
            next();
        }
    );
}

module.exports = showBeer;
