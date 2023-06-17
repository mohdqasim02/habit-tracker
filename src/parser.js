const { Habit } = require("./habit");

const parseHabits = (habitsDetails) => {
  const habits = JSON.parse(habitsDetails);

  return Object.fromEntries(habits.map((habit) => {
    const activityName = habit.activityName;
    return [activityName, new Habit(activityName, habit)];
  }));
}

const parseCommand = (command) => {
  const commands = ["add", "remove", "track", "progress", "list"];

  if (!commands.includes(command))
    throw new Error(`tracker: Not a valid command : ${command}\n`);

  return command;
}

exports.parseHabits = parseHabits;
exports.parseCommand = parseCommand;