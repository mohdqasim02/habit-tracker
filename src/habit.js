class Habit {
  constructor(activity, habit = {}) {
    this.course = habit.course || []; // []
    this.activity = habit.activity || activity; // "Running"
    this.startDate = habit.startDate || new Date().toDateString(); // "Thu May 12 2023"
    this.streaks = [];
  }

  entry(accomplished, duration) {
    const today = {
      accomplished: accomplished === "yes",
      duration,
      timeStamp: Date.parse(new Date()),
    };

    this.course.push(today);
    this.streaks = this.streak();
  }

  streak() {
    const streaks = [];

    this.course.reduce((isOnStreak, day) => {
      const attempted = day.accomplished;
      const date = day.timeStamp;

      if (!isOnStreak && attempted) {
        return this.#startNewStreak(streaks, date);
      }

      if (isOnStreak && !attempted) {
        return this.#endStreak(streaks, date);
      }

      return isOnStreak;
    }, false);

    return streaks;


  }

  #endStreak(streaks, date) {
    const lastStreak = streaks.at(-1);
    const daysPassed = (date - lastStreak.start) / (1000 * 60 * 60 * 24);

    lastStreak.end = date;
    lastStreak.streak = Math.floor(daysPassed);

    return false;
  }

  #startNewStreak(streaks, date) {
    streaks.push({ start: date });
    return true;
  }

  currentStreak() {
    return this.streaks.at(-1);
  }

  longestStreak() {
    return this.streaks.reduce((longest, streak) => {
      return longest.days >= streak.days ? longest : streak;
    });
  }


  longestDuration() {
    return this.course.reduce(function (best, day) {
      return best.duration > day.duration ? best : day;
    });
  }
}

exports.Habit = Habit;
