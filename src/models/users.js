const { createHabits } = require('./habits');

class Users {
  #users;

  constructor(users) {
    this.#users = users;
  }

  #getUser({ name, password }) {
    return this.#users.find(user =>
      user.name === name && user.password === password
    );
  }

  add({ name, password }) {
    this.#users.push({
      name,
      password,
      habits: createHabits([])
    });
  }

  isValid(credentials) {
    if (this.#getUser(credentials)) {
      return true;
    }

    return false;
  }

  getHabits(credentials) {
    if (this.isValid(credentials)) {
      return this.#getUser(credentials).habits;
    }

    return -1;
  }

  get usersData() {
    return this.#users.map(({ name, password, habits }) =>
      ({ name, password, habits: habits.habitsData }));
  }
}

const createUsers = (usersData) => {
  const users = usersData.map(({ name, password, habits }) => ({
    name,
    password,
    habits: createHabits(habits)
  }));

  return new Users(users);
};

module.exports = { createUsers };