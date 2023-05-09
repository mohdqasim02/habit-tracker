class Tracker {
  constructor(habits) {
    this.habits = {...habits};
  }

  add(activity, startDate) {
    this.habits[activity] = {
      activity,
      startDate,
      streak: 0,
      showedUp: 0,
      missed: 0,
      time: 0,
    };

    return this.habits[activity];
  };

  track(activity, action, time) {
    const habit = this.habits[activity];

    if(action === "missed") {
      habit.missed += 1;
      habit.streak = 0;
    } else {
      habit.showedUp += 1;
      habit.streak += 1;
      habit.time += +time;
    }

    return habit;
  };

  get() {
    return {...this.habits};
  };

  activities() {
    return Object.keys(this.habits);
  };

  progress(activity) {
    return {...this.habits[activity]};
  };
}

const initialize = function(habits) {
  return new Tracker(habits);
};

exports.initialize = initialize;  