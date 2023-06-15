const { Habit } = require("./habit.js");

class Tracker {
  #habits;

  constructor(habits) {
    this.#habits = habits;
  }

  add(activity) {
    this.#habits[activity] = new Habit(activity);
    return `${activity} added for tracking`;
  }

  remove(activity) {
    delete this.#habits[activity];
    return `${activity} removed from tracking`;
  }

  track(activity, presence, duration) {
    let message = `Today's log added`;

    try {
      const habit = this.#habits[activity];
      habit.entry(presence, duration);
    } catch (e) {
      message = this.errorMsg(activity);
    }

    return message;
  }

  list() {
    return Object.keys(this.#habits);
  }

  progress(activity) {
    try {
      return this.#habits[activity].course;
    } catch (e) {
      return this.errorMsg(activity);
    }
  }

  usage() {
    let message =
      "    Usage of tracker.js:" +
      "\n" +
      " -> add [activity]" +
      "\n" +
      " -> remove [activity]" +
      "\n" +
      " -> track [activity] [accomplished: yes/no] [duration in mins]" +
      "\n" +
      " -> progress [activity]" +
      "\n" +
      " -> list";

    return message;
  }

  errorMsg(activity) {
    let error = ` ${activity} habit not found, first add activity to track`;
    error += `\n -> usage : node tracker.js add ${activity}`;

    return error;
  }

  get habits() {
    return Object.values(this.#habits).map((habit) => {

      return {
        streaks: habit.streaks,
        course: habit.course,
        startDate: habit.startDate,
        activityName: habit.activityName
      };
    });
  }

  getHabit(activityName) {
    return this.#habits[activityName];
  }
}

const initialize = function (habitsDetails) {
  const habits = Object.fromEntries(
    habitsDetails.map((habit) => {
      const activityName = habit.activityName;
      return [activityName, new Habit(activityName, habit)];
    })
  );

  return new Tracker(habits);
};

exports.initialize = initialize;
