const fs = require("fs");
const { Renderer } = require("./src/renderer.js");
const { Tracker } = require("./src/habit-tracker.js");
const { parseCommand, parseHabits } = require("./src/parser.js");

const main = function ([command, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");

  const habits = parseHabits(habitsContent);
  const tracker = new Tracker(habits, new Renderer(process.stdout));
  const { commandToExecute, error } = parseCommand(command);

  if (error) {
    console.error(error.message);
    console.error(tracker.usage());
    process.exit(1);
  }

  try {
    tracker[commandToExecute](activity, ...args);
  } catch (err) {
    console.error(err.message);
  }

  fs.writeFileSync("./resources/habits.json", JSON.stringify(tracker.habits, null, 2));
};

main(process.argv.slice(2));