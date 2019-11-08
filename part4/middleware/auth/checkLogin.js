function checkLogin(req, res, next) {
    res.locals.user = "dump user";
    next();
}

module.exports = checkLogin;
