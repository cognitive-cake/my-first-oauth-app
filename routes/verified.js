const express = require('express');

const router = express.Router();

/* GET verified page */
router.get('/', (req, res) => {
  res.render('verified');
  console.log(req.params[0]);
});

module.exports = router;
