const {
  serveHabits
} = require("./handlers/habits-handler");

const PATHS = {
  HABITS: '/habits',
  HABIT: '/habits/:activity',
};

const createRoutes = (app) => {
  app.get(PATHS.HABITS, serveHabits);
};

module.exports = { createRoutes };