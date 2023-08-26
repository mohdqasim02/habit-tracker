const serveHabits = (req, res) => {
  const { habits } = req.app.context;
  res.json(habits.habitsData);
}

module.exports = {
  serveHabits,
}