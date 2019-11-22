let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/beers');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
