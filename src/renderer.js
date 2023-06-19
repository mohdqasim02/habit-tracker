const validateStreakEnd = (date) => {
  if (date === 'Invalid Date')
    return 'ongoing';
  return date;
}

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

  renderDayFeilds(day) {
    return Object.keys(day).join("|");
  }

  renderDay({ accomplished, duration, timeStamp }) {
    const presence = accomplished ? "✅" : "❌";
    const date = new Date(timeStamp).toDateString();

    return [presence, (duration || '00'), date].join(" | ");
  }

  renderStreak(streak) {
    const start = new Date(streak.start).toDateString();
    const end = new Date(streak.end).toDateString();
    const str = "start: " + start +
      "\t" + "end: " + validateStreakEnd(end) +
      "\t" + "days: " + (streak.streak === undefined ? 'present' : streak.streak);

    return str;
  }

  renderProgress(habit) {
    const message = "StartDate: " +
      new Date(habit.startDate).toDateString() +
      "\n" + "Habit: " + habit.activityName +
      "\n" + this.renderDayFeilds(habit.course[0]) +
      "\n" + habit.course.map(this.renderDay).join("\n") +
      "\n" + habit.streaks.map(this.renderStreak).join("\n");

    this.display(message);
  }
}

exports.Renderer = Renderer;