const Habit = require('./habit.js');

class Habits {
  #habits;

  constructor(habits) {
    this.#habits = habits;
  }

  add(activity) {
    this.#habits[activity] = new Habit(activity);
    return true;
  }

  remove(activity) {

    delete this.#habits[activity];
    return true;
  }

  track(activity, presence, duration) {
    const habit = this.#habits[activity];

    if (!habit) return false;

    habit.entry(presence, duration);
    return true;
  }

  list() {
    return Object.keys(this.#habits);
  }

  getHabit(activity) {
    const habit = this.#habits[activity];

    if (!habit) return false;
    return habit.data();
  }

  get habitsData() {
    return Object.values(this.#habits).map(habit => habit.data());
  }
}

const createHabits = (habitsData) => {
  const habits = habitsData.map((habit) =>
    [habit.activity, new Habit(habit.activity, habit)]
  );

  return new Habits(Object.fromEntries(habits));
};

module.exports = { createHabits };