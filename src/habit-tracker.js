const fs = require("fs");

const add = function(activity, startDate) {
  this[activity] = {
    activity,
    startDate,
    streak: 0,
    showedUp: 0,
    missed: 0,
    time: 0,
  };

  return this[activity]; 
};

const track = function(activity, action, time) {
  const habit = this[activity];

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

const get = function() {
  return this;
};

const progress = function(activity) {
  return this[activity];
};

const save = function() {
  fs.writeFileSync("./resources/habits.json", JSON.stringify(this));
};

const initialize = function(habitsContent) {
  const habits = JSON.parse(habitsContent.trim());

  return {
    add: add.bind(habits),
    save: save.bind(habits),
    track: track.bind(habits),
    activities: get.bind(habits),
    progress: progress.bind(habits),
  };
};

exports.add = add;
exports.track = track;
exports.progress = progress;
exports.initialize = initialize;
