let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

router.get('/login', function(req, res, next) {
    res.render('login.html', { title: 'Express' });

});

router.post('/login', auth.login);

router.post('/login', function (req, res, next) {
    res.redirect('/beers');
});

router.post('/registration', auth.registration);

router.post('/registration', function(req, res, next) {
    res.redirect('/beers');
});

router.get('/registration', function(req, res, next) {
    res.render('registration.html', { title: 'Express' });
});

module.exports = router;