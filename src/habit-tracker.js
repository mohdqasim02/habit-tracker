const { Habit } = require("./habit.js");

class Tracker {
  #habits;
  #renderer;

  constructor(habits, renderer) {
    this.#habits = habits;
    this.#renderer = renderer;
  }

  add(activity) {
    if (activity === undefined)
      throw new Error(`tracker: Invalid activity`);

    this.#habits[activity] = new Habit(activity);
    this.#renderer.display(`${activity} added for tracking`);
  }

  remove(activity) {
    if (activity === undefined)
      throw new Error(`tracker: Invalid activity`);

    delete this.#habits[activity];
    this.#renderer.display(`${activity} removed from tracking`);
  }

  track(activity, presence, duration) {
    if (activity === undefined)
      throw new Error(`Tracker: Invalid Activity`);

    this.#habits[activity].entry(presence, duration);
    this.#renderer.display(`Today's log added`);
  }

  list() {
    this.#renderer.renderHabits(Object.keys(this.#habits));
  }

  progress(activity) {
    if (activity === undefined)
      throw new Error(`Tracker: Invalid Activity`);

    this.#renderer.renderProgress(this.#getHabit(activity));
  }

  usage() {
    let message =
      "    Usage of tracker.js:" +
      "\n" + " -> add [activity]" +
      "\n" + " -> remove [activity]" +
      "\n" + " -> track [activity] [accomplished: yes/no] [duration in mins]" +
      "\n" + " -> progress [activity]" +
      "\n" + " -> list";

    return message;
  }

  errorMsg(activity) {
    return ` ${activity} habit not found, first add activity to track`;
  }

  get habits() {
    return Object.values(this.#habits).map(habit => {
      return this.#getHabit(habit.activityName);
    });
  }

  #getHabit(activityName) {
    const habit = this.#habits[activityName];

    return {
      course: habit.course,
      streaks: habit.streaks,
      startDate: habit.startDate,
      activityName: habit.activityName
    };
  }
}

exports.Tracker = Tracker;