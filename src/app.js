const express = require('express');
const { createRoutes } = require('./router');
const { logRequest } = require('./middlewares/logger');
const { parseCookies } = require('./middlewares/cookies');
const {
  authenticate,
  loginPage,
  login,
  signup,
  signupPage,
  logout,
  username } = require('./handlers/auth-handler');

const attachMiddleware = (app) => {
  app.use(logRequest);
  app.use(parseCookies);
  app.use(express.json());
  app.use(express.urlencoded());
};

const attachAuthentication = (app) => {
  app.get('/css/style.css', (_, res) =>
    res.sendFile('style.css', { root: 'public/css' }));

  app.get('/css/login.css', (_, res) =>
    res.sendFile('login.css', { root: 'public/css' }));

  app.get('/signup', signupPage);
  app.post('/signup', signup);
  app.get('/login', loginPage);
  app.post('/login', login);
  app.post('/logout', logout);
  app.get('/username', username);
  app.use(authenticate);
};

const createApp = (users, storage) => {
  const app = express();

  app.context = { users, storage };

  attachMiddleware(app);
  attachAuthentication(app);
  createRoutes(app);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
