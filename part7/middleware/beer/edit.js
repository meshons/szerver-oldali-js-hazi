let { Beer } = require("../../database/db");
const {validationResult} = require('express-validator');

function editBeer(req, res, next) {
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

    Beer.findByIdAndUpdate(req.params.id,{
            $set: {
                where: req.body.where,
                what: req.body.what,
                liter: req.body.liter
            }
        }, { new: true } ,
        function (err, beer) {
            next();
        }
    );
}

module.exports = editBeer;
