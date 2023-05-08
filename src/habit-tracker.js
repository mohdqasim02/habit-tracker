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
  return {...this};
};

const activities = function() {
  return Object.keys(this);
};

const progress = function(activity) {
  return {...this[activity]};
};

const initialize = function(habitsContent) {
  const habitsData = JSON.parse(habitsContent.trim());

  return {
    get: get.bind(habitsData);
    add: add.bind(habitsData);
    track: track.bind(habitsData);
    progress: progress.bind(habitsData);
    activities: activities.bind(habitsData);
  };
};

exports.initialize = initialize;
