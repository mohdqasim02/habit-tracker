const { createHabits } = require('./habits');

class Users {
  #users;

  constructor(users) {
    this.#users = users || {};
  }

  add({ name, password }) {
    this.#users[name] = {
      name,
      password,
      habits: createHabits([])
    };
  }

  isValid({ name, password }) {
    if (name in this.#users) {
      return password === this.#users[name].password;
    }

    return false;
  }

  getHabits(name) {
    const user = this.#users[name];

    console.log(user);
    return user.habits;
  }
}

module.exports = { Users };