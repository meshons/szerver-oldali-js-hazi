function redirectLogged(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        res.locals.user = req.session.user;
        res.redirect('/beers');
    } else {
        next();
    }
}

module.exports = redirectLogged;