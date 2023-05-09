class Habit {
  constructor(activity) {
    this.activity = activity;
    this.startDate = (new Date()).toDateString();
    this.course = 0;
    this.streak = 0;
    this.missed = 0;
    this.showedUp = 0;
    this.largestStreak = 0;
    this.bestPerformance = 0;
  };

  updateLargestStreak() {
    this.largestStreak = Math.max(this.largestStreak, this.streak);
  }

  updateBestPerformance(duration) {
    this.bestPerformance = Math.max(this.bestPerformance, duration);
  }

  incrementStreak() {
    this.streak += 1;
    this.updateLargestStreak();
  }

  incrementMissed() {
    this.missed += 1;
    this.streak = 0;
  }

  incrementShowedUp() {
    this.showedUp += 1;
  }

  updateCourse(duration) {
    this.updateBestPerformance(duration);
    this.course += duration;
  }
}

exports.Habit = Habit;
