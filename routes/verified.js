const express = require('express');

const router = express.Router();

/* GET verification page */
router.get('/', (req, res) => {
  if (req.query.error) {
    res.render('verified', { status: 'Ошибка!', message: 'Доступ к вашему аккаунту не был предоставлен.' });
  } else if (req.query.code) {
    res.render('verified', { status: 'Авторизация успешна!' });
  } else {
    res.render('verified', { status: 'Авторизация не пройдена', message: 'Попробуйте ещё раз' });
  }
});

module.exports = router;
