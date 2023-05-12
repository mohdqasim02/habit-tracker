class Habit {
  constructor(activity, habit = {}) {
    this.course = habit.course || []; // []
    this.activity = habit.activity || activity; // "Running"
    this.startDate = habit.startDate || (new Date()).toDateString(); // "Thu May 12 2023"
  }
  
  entry(accomplished, duration) {
    const today = {
      accomplished,
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