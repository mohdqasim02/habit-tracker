class Renderer {
  #outputStream;

  constructor(outputStream) {
    this.#outputStream = outputStream;
  }

  display(message) {
    this.#outputStream.write(message + '\n');
  }

  renderHabits(habits) {
    this.display(habits.join("\n"));
  }

  renderDay(day) {
    return Object.values(day).map(value => {
      if (typeof value === 'number')
        return new Date(value).toDateString();
      return value;
    }).join(" | ");
  }

  renderStreak(streak) {
    const start = new Date(streak.start).toDateString();
    const end = new Date(streak.end).toDateString();
    const str = "start: " + start + "\t" + "end: " + end;
    return str;
  }

  renderProgress(habit) {
    const message = new Date(habit.startDate).toDateString() +
      "\n" + habit.activityName.toUpperCase() +
      "\n" + habit.course.map(this.renderDay).join("\n") +
      "\n" + habit.streaks.map(this.renderStreak).join("\n");

    this.display(message);
  }
}

exports.Renderer = Renderer;