const { Habit } = require("./habit");

const parseHabits = (habitsDetails) => {
  const habits = JSON.parse(habitsDetails);

  return Object.fromEntries(habits.map((habit) => {
    const activityName = habit.activityName;
    return [activityName, new Habit(activityName, habit)];
  }));
}

const parseArgs = (args) => {
  return args.map(arg => {
    if (+arg || +arg === 0)
      return +arg;
    return arg.toUpperCase()
  });
};

const parseCommand = (command) => {
  const commands = ["add", "remove", "track", "progress", "list"];

  if (!commands.includes(command))
    return { error: new Error(`tracker: Not a valid command : ${command}\n`) };

  return { commandToExecute: command };
}

exports.parseArgs = parseArgs;
exports.parseHabits = parseHabits;
exports.parseCommand = parseCommand;