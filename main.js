const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const main = function([utility, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const habits = initialize(habitsContent);

  habits[utility](activity, ...args);
  habits.save();
  console.table(habits.progress(activity));
};

main(process.argv.slice(2));
