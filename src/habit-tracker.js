const { Habit } = require("./habit.js");

class Tracker {
  constructor(habits) {
    this.habits = habits;
  }

  add(activity) {
    this.habits[activity] = new Habit(activity);
    return `${activity} added for tracking`;
  };

  remove(activity) {
    delete this.habits[activity];
    return `${activity} removed from tracking`;
  }

  track(activity, presence, duration) {
    let message = `Today's log added`;

    try{
      const habit = this.habits[activity];
      habit.entry(presence, duration);
    } catch(e) {
      message = this.errorMsg(activity);
    };

    return message;
  }

  list() {
    return {...this.habits};
  };

  activities() {
    return Object.keys(this.habits);
  };

  progress(activity) {
    try {
      return [...this.habits[activity].course];
    } catch(e) {
      return this.errorMsg(activity);
    };
  };
  
  usage() {
    let message = '    Usage of tracker.js:';
    message += '\n -> add activityName';
    message += '\n -> remove activityName';
    message += '\n -> track activityName accomplished(y/n) duration(in mins)';
    message += '\n -> progress activityName';
    message += '\n -> activities';
    message += '\n -> list';
    
    return message;
  }
  
  errorMsg(activity) {
    let error = ` ${activity} habit not found, first add activity to track`
    error +=  `\n -> usage : node tracker.js add ${activity}`;

    return error;
  }
}

const initialize = function(habitsDetails) {
  const habits = Object.fromEntries(Object.entries(habitsDetails)
    .map(function([activityName, activityData]) {
      return [activityName, new Habit(activityName, activityData)];
    }));

  return new Tracker(habits);
};

exports.initialize = initialize;  