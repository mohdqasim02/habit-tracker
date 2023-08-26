const {
  addHabit,
  serveHabits,
  removeHabit,
  trackHabit,
  serveHabit
} = require('./handlers/habits-handler');

const PATHS = {
  HABITS: '/habits',
  HABIT: '/habits/:activity',
};

const createRoutes = (app) => {
  app.get(PATHS.HABITS, serveHabits);
  app.get(PATHS.HABIT, serveHabit);
  app.post(PATHS.HABITS, addHabit);
  app.post(PATHS.HABIT, trackHabit);
  app.delete(PATHS.HABITS, removeHabit);
};

module.exports = { createRoutes };