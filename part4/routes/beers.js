let express = require('express');
let router = express.Router();
let beer = require("../middleware/beer");
let auth = require('../middleware/auth');

router.use(auth.checkLogin);

router.get('/beers', beer.listBeers);
router.get('/beers', function(req, res, next) {
    res.render('mybeers.ejs', { beers: res.locals.beers, user: res.locals.user });
});

router.get('/beer/add', function(req, res, next) {
    res.render('beer/add.ejs', { title: 'Express' });
});

router.post('/beer/add', beer.addBeer);

router.post('/beer/add', function (req, res, next) {
   res.redirect('/beers');
});

router.get('/beer/modify/:id', beer.showBeer);
router.get('/beer/modify/:id', function(req, res, next) {
    res.render('beer/modify.ejs', { beer: res.locals.beer });
});

router.post('/beer/modify/:id', beer.editBeer);
router.post('/beer/modify/:id', function (req, res, next) {
    res.redirect('/beers');
});

router.get('/beer/remove/:id', beer.removeBeer);
router.get('/beer/remove/:id', function (req, res, next) {
    res.redirect('/beers');
});

module.exports = router;
