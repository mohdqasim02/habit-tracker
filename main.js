const fs = require('node:fs');
const Storage = require('./src/storage');
const { createApp } = require('./src/app');
const { createHabits } = require('./src/models/habits');

const PORT = 8000;
const HABITS_FILEPATH = 'storage/habits.json';

const main = () => {
  const storage = new Storage(HABITS_FILEPATH, fs);
  const habits = createHabits(storage.load());
  const app = createApp(habits, storage);

  app.listen(PORT, () => console.log(`Todo app listening on port ${PORT}`));
};

main();