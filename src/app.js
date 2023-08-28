const express = require('express');
const { createRoutes } = require('./router');
const { logRequest } = require('./middlewares/logger');

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

const createApp = (habits, storage) => {
  const app = express();

  app.context = { habits, storage };

  app.use(logRequest);
  app.use(parseCookies);
  app.use(express.json());
  app.use(express.urlencoded());

  createRoutes(app);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };