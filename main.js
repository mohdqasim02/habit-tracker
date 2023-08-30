const fs = require('node:fs');
const Storage = require('./src/storage');
const { createApp } = require('./src/app');
const { createUsers } = require('./src/models/users');

const PORT = 8001;
const USERS_FILEPATH = 'storage/user-data.json';

const main = () => {
  const storage = new Storage(USERS_FILEPATH, fs);
  const users = createUsers(storage.load());
  const app = createApp(users, storage);

  app.listen(PORT, () =>
    console.log(`App listening at: http://localhost:${PORT}`));
};

main();