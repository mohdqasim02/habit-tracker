const express = require('express');
const { createRoutes } = require('./router');
const { logRequest } = require('./middlewares/logger');
const { parseCookies } = require('./middlewares/cookies');
const {
  authenticate,
  loginPage,
  login,
  signup,
  signupPage } = require('./handlers/auth-handler');

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