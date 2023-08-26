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

const removeHabit = (req, res) => {
  const { habits, storage } = req.app.context;
  const { activity } = req.body;
  const success = habits.remove(activity);

  if (success) {
    storage.write(habits.habitsData, () => {
      res.status(201).end();
    });

    return;
  }

  res.status(400).end();
};

const trackHabit = (req, res) => {
  const { habits, storage } = req.app.context;
  const { presence, duration } = req.body;
  const success = habits.track(req.params.activity, presence, duration);

  if (success) {
    storage.write(habits.habitsData, () => {
      res.status(201).end();
    });

    return;
  }

  res.status(400).end();
};

module.exports = {
  addHabit,
  removeHabit,
  serveHabits,
  trackHabit
};