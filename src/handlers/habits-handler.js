const serveHabits = (req, res) => {
  const { habits } = req.app.context;
  res.json(habits.habitsData);

};

const addHabit = (req, res) => {
  const { habits, storage } = req.app.context;
  const { activity } = req.body;
  const success = habits.add(activity);

  if (success) {
    storage.write(habits.habitsData, () => {
      res.status(201).end();
    });

    return;
  }

  res.status(400).end();
};

module.exports = {
  serveHabits,
  addHabit,
};