var express = require('express');
var router = express.Router();

/* GET verified page */
router.get('/', function (req, res, next) {
  res.render('verified');
});

module.exports = router;
