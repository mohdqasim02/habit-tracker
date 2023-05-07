const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const main = function([utility, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const habits = initialize(habitsContent);

  const progress = habits[utility](activity, ...args);
  habits.save();
  console.table(progress);
};

main(process.argv.slice(2));
