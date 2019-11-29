function checkLogin(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = checkLogin;
