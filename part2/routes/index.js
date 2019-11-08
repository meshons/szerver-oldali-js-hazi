var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login.html', { title: 'Express' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration.html', { title: 'Express' });
});

router.get('/mybeers', function(req, res, next) {
  res.render('mybeers.html', { title: 'Express' });
});

router.get('/beer/add', function(req, res, next) {
  res.render('beer/add.html', { title: 'Express' });
});

router.get('/beer/modify', function(req, res, next) {
  res.render('beer/modify.html', { title: 'Express' });
});

module.exports = router;
