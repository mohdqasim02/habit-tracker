const express = require('express');
const { logRequest } = require('./middleware');
const { createRoutes } = require('./router');

const createApp = (habits, storage) => {
  const app = express();

  app.context = { habits, storage };
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(logRequest);
  createRoutes(app);
  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };