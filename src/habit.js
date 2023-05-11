class Habit {
  constructor(activity) {
    this.course = [];
    this.activity = activity;
    this.startDate = (new Date()).toDateString();
  }
  
  entry(presence, duration) {
    const today = {
      presence,
      duration,
      timeStamp: (new Date()).toDateString(),
    }

    this.course.push(today);
  }

  streak() {
    const initialStreak = { current: 0, largest: 0};

    return this.course.reduce(function(streak, day) {
      if(day.presence) {
        streak.current += 1;
      } else {
        streak.current = 0;
      }
      streak.largest = Math.max(streak.current, streak.largest);
      
      return streak;
    }, initialStreak);
  }

  bestPractice() {
    return this.course.reduce(function(best, day) {
      return best.duration > day.duration ? best : day;
    });
  }
}

exports.Habit = Habit;