let express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.userId !== undefined) {
    res.redirect('/beers');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
