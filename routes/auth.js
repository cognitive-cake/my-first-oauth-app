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

// Set recieved data to token
const setToken = (data) => {
  token = data;
  console.log('stored token:', token);
};

/* GET Access token */
const getToken = (code) => {
  request.get(
    `https://oauth.vk.com/access_token?client_id=${parameters.client_id}&client_secret=${parameters.client_secret}&code=${code}&redirect_uri=${parameters.redirect_uri}`,
    (error, response, body) => {
      if (error) {
        throw (error);
      }
      // console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      setToken(body);
    },
  );
};

/* GET authorization page */
router.get('/', (req, res) => {
  console.log('Cookies!:', req.cookies);
  if (req.cookies.access_token) {
    console.log('token:', req.cookies.access_token);
    res.render('auth', { status: 'Токен получен!' });
  } else if (req.query.error) {
    console.error(`Auth error: ${req.query.error}`);
    console.error(`Error description: ${req.query.error_description}`);
    res.render('auth', { status: 'Ошибка!', message: 'Доступ к вашему аккаунту не был предоставлен.' });
  } else if (req.query.code) {
    getToken(req.query.code);
    res.render('auth', { status: 'Авторизация успешна!' });
  } else {
    res.render('auth', { status: 'Авторизация не пройдена', message: 'Попробуйте ещё раз' });
  }
});

module.exports = router;

/* console.log(token);
res.cookie('access_token', token.access_token, {
  domain: '.herokuapp.com',
  expires: new Date(Date.now() + token.expires_in),
  httpOnly: true,
  secure: true,
});
res.cookie('user_id', token.user_id, {
  domain: '.herokuapp.com',
  expires: new Date(Date.now() + token.expires_in),
  httpOnly: true,
  secure: true,
}); */
