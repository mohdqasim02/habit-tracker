const express = require('express');
const { createRoutes } = require('./router');
const { logRequest } = require('./middlewares/logger');
const {
  authenticate,
  loginPage,
  login,
  signup,
  signupPage } = require('./handlers/auth-handler');

const parseCookies = (req, _, next) => {
  if (!req.headers.cookie) {
    req.cookies = {};
    next();
    return;
  }

  const { cookie } = req.headers;
  const keyValuePairs = cookie.split('; ').map((kv) => kv.split('='));

  req.cookies = Object.fromEntries(keyValuePairs);
  next();
};

const createApp = (users, storage) => {
  const app = express();

  app.context = { users, storage };

  app.use(logRequest);
  app.use(parseCookies);
  app.use(express.json());
  app.use(express.urlencoded());

  app.get('/signup', signupPage);
  app.post('/signup', signup);

  app.get('/login', loginPage);
  app.post('/login', login);

  app.use(authenticate);
  createRoutes(app);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };