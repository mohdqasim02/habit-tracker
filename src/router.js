const {
  serveHabits, addHabit
} = require('./handlers/habits-handler');

const PATHS = {
  HABITS: '/habits',
  HABIT: '/habits/:activity',
};

const createRoutes = (app) => {
  app.get(PATHS.HABITS, serveHabits);
  app.post(PATHS.HABITS, addHabit);
};

module.exports = { createRoutes };