const create = function(activity, startDate) {
  return {
    activity,
    startDate,
    streak: 0,
    showedUp: 0,
    missed: 0,
    time: 0,
  };
};

const track = function(habit, action, time) {
  if(action === "missed") {
    habit.missed += 1;
    habit.streak = 0;
    return;
  }

  habit.showedUp += 1;
  habit.streak += 1;
  habit.time += time;
};

const progress = function(habit) {
  return habit;
};

exports.track = track;
exports.create = create;
exports.progress = progress;
