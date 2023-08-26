const {
  addHabit,
  serveHabits,
  removeHabit,
  trackHabit
} = require('./handlers/habits-handler');

const PATHS = {
  HABITS: '/habits',
  HABIT: '/habits/:activity',
};

const createRoutes = (app) => {
  app.get(PATHS.HABITS, serveHabits);
  app.post(PATHS.HABITS, addHabit);
  app.post(PATHS.HABIT, trackHabit);
  app.delete(PATHS.HABITS, removeHabit);
};

module.exports = { createRoutes };