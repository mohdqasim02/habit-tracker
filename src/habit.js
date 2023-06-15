class Habit {
  #course;
  #streaks;
  #activity;
  #startDate;

  constructor(activity, habit = {}) {
    this.#course = habit.course || [];
    this.#streaks = habit.streak || [];
    this.#activity = habit.activity || activity;
    this.#startDate = habit.startDate || new Date().toDateString();
  }

  #createLog(accomplished, duration, otherDetails) {
    return {
      accomplished: accomplished === "yes",
      duration,
      timeStamp: Date.parse(new Date()),
      ...otherDetails,
    };
  }

  #startNewStreak(streaks, date) {
    streaks.push({ start: date });
    return true;
  }

  #endStreak(streaks, date) {
    const lastStreak = streaks.at(-1);
    const daysPassed = (date - lastStreak.start) / (1000 * 60 * 60 * 24);

    lastStreak.end = date;
    lastStreak.streak = Math.floor(daysPassed);

    return false;
  }

  entry(accomplished, duration, otherDetails) {
    const todaysLog = this.#createLog(accomplished, duration, otherDetails);

    this.#course.push(todaysLog);
    this.#streaks = this.streak();
  }

  streak() {
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

  currentStreak() {
    return this.#streaks.at(-1);
  }

  longestStreak() {
    return this.#streaks.reduce((longest, streak) => {
      return longest.days >= streak.days ? longest : streak;
    });
  }

  longestDuration() {
    return this.#course.reduce((best, day) => {
      return best.duration > day.duration ? best : day;
    });
  }

  get course() {
    return [...this.#course];
  }

  get activityName() {
    return this.#activity;
  }

  get startDate() {
    return this.#startDate;
  }

  get streaks() {
    return [...this.#streaks];
  }
}

exports.Habit = Habit;
