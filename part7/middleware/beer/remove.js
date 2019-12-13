let { Beer } = require("../../database/db");


function removeBeer(req, res, next) {
    Beer.findByIdAndDelete(req.params.id, function (err) {
        next();
    })
}

module.exports = removeBeer;
