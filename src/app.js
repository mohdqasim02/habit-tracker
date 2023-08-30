const express = require('express');
const { createRoutes } = require('./router');
const { logRequest } = require('./middlewares/logger');
const { parseCookies } = require('./middlewares/cookies');
const { signupPage, loginPage } = require('./handlers/file-handler');
const {
  login,
  signup,
  logout,
  username,
  authenticate,
} = require('./handlers/auth-handler');

const attachMiddleware = (app) => {
  app.use(logRequest);
  app.use(parseCookies);
  app.use(express.json());
  app.use(express.urlencoded());
};

const serveAuthPages = (app) => {
  app.get('/css/style.css', (_, res) =>
    res.sendFile('style.css', { root: 'public/css' }));

  app.get('/css/login.css', (_, res) =>
    res.sendFile('login.css', { root: 'private/css' }));

  app.get('/login', loginPage);
  app.get('/signup', signupPage);
};

const attachAuthentication = (app) => {
  app.post('/login', login);
  app.post('/logout', logout);
  app.post('/signup', signup);
  app.use(authenticate);
  app.get('/username', username);
};

const createApp = (users, storage, readFile) => {
  const app = express();

  app.context = { users, storage, readFile };

  attachMiddleware(app);
  serveAuthPages(app);
  attachAuthentication(app);
  createRoutes(app);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
