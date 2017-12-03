const express = require('express');

const router = express.Router();

/* GET authorization page */
router.get('/', (req, res) => {

});

router.get('/success', (req, res) => {
  res.render('auth-result', { status: 'Токен найден!' });
});

module.exports = router;
