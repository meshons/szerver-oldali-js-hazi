let express = require('express');
let router = express.Router();
let beer = require("../middleware/beer");
let auth = require('../middleware/auth');

router.use(auth.checkLogin);

router.get('/beers', beer.listBeers);
router.get('/beers', function(req, res, next) {
    res.render('mybeers.html', { title: 'Express' });
});

router.get('/beer/add', function(req, res, next) {
    res.render('beer/add.html', { title: 'Express' });
});

router.post('/beer/add', beer.addBeer);

router.post('/beer/add', function (req, res, next) {
   res.redirect('/beers');
});

router.get('/beer/modify', function(req, res, next) {
    res.render('beer/modify.html', { title: 'Express' });
});

router.post('/beer/modify', beer.editBeer);
router.post('/beer/modify', function (req, res, next) {
    res.redirect('/beers');
});

router.post('/beer/remove', beer.removeBeer);
router.post('/beer/remove', function (req, res, next) {
    res.redirect('/beers');
});

module.exports = router;
