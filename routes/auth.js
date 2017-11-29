const express = require('express');
const request = require('request');

const router = express.Router();

const parameters = {
  client_id: 6273123,
  client_secret: 'k8BFc9oForp6nfjkfi1U',
  redirect_uri: 'https://arcane-cliffs-64611.herokuapp.com/auth',
  homepage: 'https://arcane-cliffs-64611.herokuapp.com',
};

let token = '';
console.log('raw token:', token);

/* GET Access token */
const getToken = (code, cb) => {
  request.get(
    `https://oauth.vk.com/access_token?client_id=${parameters.client_id}&client_secret=${parameters.client_secret}&code=${code}&redirect_uri=${parameters.redirect_uri}`,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      token = body;
      console.log('stored token:', token);
      cb();
    },
  );
};

const redirect = () => {

};

/* GET authorization page */
router.get('/', (req, res) => {
  console.log('Cookies!:', req.cookies);
  if (req.cookies.access_token) {
    console.log('token:', req.cookies.access_token);
    res.redirect('auth/success');
  } else if (req.query.error) {
    console.error(`Auth error: ${req.query.error}`);
    console.error(`Error description: ${req.query.error_description}`);
    res.render('auth', { status: 'Ошибка!', message: 'Доступ к вашему аккаунту не был предоставлен.' });
  } else if (req.query.code) {
    getToken(req.query.code, redirect);
    res.render('auth', { status: 'Идёт авторизация...' });
  } else {
    res.render('auth', { status: 'Авторизация не пройдена', message: 'Попробуйте ещё раз' });
  }
});

router.get('/success', (req, res) => {
  res.render('auth', { status: 'Токен найден!' });
});

module.exports = router;

/* console.log(token);
res.cookie('access_token', token.access_token, {
  domain: '.herokuapp.com',
  expires: new Date(Date.now() + (token.expires_in * 1000)),
  httpOnly: true,
  secure: true,
});
res.cookie('user_id', token.user_id, {
  domain: '.herokuapp.com',
  expires: new Date(Date.now() + (token.expires_in * 1000)),
  httpOnly: true,
  secure: true,
}); */
