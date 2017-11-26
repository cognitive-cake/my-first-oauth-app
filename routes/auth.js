const express = require('express');
const request = require('request');

const router = express.Router();
const parameters = {
  client_id: 6273123,
  client_secret: 'k8BFc9oForp6nfjkfi1U',
  redirect_uri: 'https://arcane-cliffs-64611.herokuapp.com/auth',
};

const cb = (code) => {
  request.get(`https://oauth.vk.com/access_token?client_id=${parameters.client_id}&client_secret=${parameters.client_secret}&code=${code}&redirect_uri=${parameters.redirect_uri}`, (err, res, resBody) => {
    console.log('error:', err); // Print the error if one occurred and handle it
    console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
    console.log(resBody);
  });
};

/* GET verification page */
router.get('/', (req, res) => {
  if (req.query.error) {
    console.error(`Auth error: ${req.query.error}`);
    console.error(`Error description: ${req.query.error_description}`);
    res.render('auth', { status: 'Ошибка!', message: 'Доступ к вашему аккаунту не был предоставлен.' });
  } else if (req.query.code) {
    res.render('auth', { status: 'Авторизация успешна!' });
    cb(req.query.code);
  } else {
    res.render('auth', { status: 'Авторизация не пройдена', message: 'Попробуйте ещё раз' });
  }
});

module.exports = router;
