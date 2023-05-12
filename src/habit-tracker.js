const { Habit } = require("./habit.js");

class Tracker {
  constructor(habits) {
    this.habits = habits;
  }

  add(activity) {
    const habit = {
      activity,
      course: [],
      startDate: (new Date()).toDateString()
    };
    this.habits[activity] = new Habit(activity, habit);
  };

  track(activity, presence, duration) {
    const habit = this.habits[activity];
    habit.entry(presence, duration);
  };

  list() {
    return {...this.habits};
  };

  activities() {
    return Object.keys(this.habits);
  };

  progress(activity) {
    return [...this.habits[activity].course];
  };
}

const initialize = function(habitsDetails) {
  const habits = Object.fromEntries(Object.entries(habitsDetails)
    .map(function([activityName, activityData]) {
      return [activityName, new Habit(activityName, activityData)];
    }));
  return new Tracker(habits);
};

exports.initialize = initialize;  