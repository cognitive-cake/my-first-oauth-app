const express = require('express');

const router = express.Router();

/* GET verified page */
router.get('/', (req, res) => {
  const param = req.params[0];
  res.render('verified', { status: param });
});

module.exports = router;
