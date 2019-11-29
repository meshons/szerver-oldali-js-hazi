let express = require('express');
let router = express.Router();
let beer = require("../middleware/beer");
let auth = require('../middleware/auth');

const {check} = require('express-validator');

router.get('/beers', auth.checkLogin, beer.listBeers);
router.get('/beers', function(req, res, next) {
    res.render('mybeers', { beers: res.locals.beers, user: res.locals.user });
});

router.get('/beer/add', auth.checkLogin, function(req, res, next) {
    res.render('beer/add', req.query);
});

router.post('/beer/add', auth.checkLogin, [
    check('where').not().isEmpty().withMessage('placeEmpty'),
    check('what').not().isEmpty().withMessage('beerEmpty'),
    check('liter').not().isEmpty().withMessage('literEmpty')
        .isFloat().withMessage('literIsNotFloat')
    ], beer.addBeer);
router.post('/beer/add', function (req, res, next) {
   res.redirect('/beers');
});

router.get('/beer/modify/:id', auth.checkLogin, beer.showBeer);
router.get('/beer/modify/:id', function(req, res, next) {
    let params = req.query;
    params.beer = res.locals.beer;
    res.render('beer/modify', params);
});

router.get('/beer/show/:id', auth.checkLogin, beer.showBeer);
router.get('/beer/show/:id', function(req, res, next) {
    res.render('beer/show', { beer: res.locals.beer });
});

router.post('/beer/modify/:id', auth.checkLogin, beer.editBeer);
router.post('/beer/modify/:id',
    [
    check('where').not().isEmpty().withMessage('placeEmpty'),
    check('what').not().isEmpty().withMessage('beerEmpty'),
    check('liter').not().isEmpty().withMessage('literEmpty')
        .isFloat().withMessage('literIsNotFloat')
    ], function (req, res, next) {
    res.redirect('/beers');
});

router.get('/beer/remove/:id', auth.checkLogin, beer.removeBeer);
router.get('/beer/remove/:id', function (req, res, next) {
    res.redirect('/beers');
});

module.exports = router;
