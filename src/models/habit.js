class Habit {
  #course;
  #streaks;
  #activity;
  #startDate;

  constructor(activity, habit = {}) {
    this.#course = habit.course || [];
    this.#streaks = habit.streaks || [];
    this.#activity = habit.activity || activity;
    this.#startDate = habit.startDate || new Date();
  }

  #startNewStreak(streaks, date) {
    streaks.push({ start: date });
    return true;
  }

  #endStreak(streaks, date) {
    const lastStreak = streaks.at(-1);
    lastStreak.end = date;
    return false;
  }

  #streak() {
    const streaks = [];

    this.#course.reduce((isOnStreak, day) => {
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

  entry(accomplished, duration, otherDetails) {
    const log = {
      accomplished,
      timeStamp: new Date(),
      duration: accomplished ? duration : 0,
      ...otherDetails,
    };

    this.#course.push(log);
    this.#streaks = this.#streak();
  }

  currentStreak() {
    return this.#streaks.at(-1);
  }

  longestStreak() {
    return this.#streaks.reduce((longest, streak) => {
      return longest.days >= streak.days ? longest : streak;
    });
  }

  longestDuration() {
    return this.#course.reduce((longest, day) => {
      return longest.duration > day.duration ? longest : day;
    });
  }

  data() {
    return {
      course: this.course,
      streaks: this.streaks,
      activity: this.activity,
      startDate: this.startDate,
    };
  }

  get course() {
    return [...this.#course];
  }

  get activity() {
    return this.#activity;
  }

  get startDate() {
    return this.#startDate;
  }

  get streaks() {
    return [...this.#streaks];
  }
}

module.exports = Habit;
