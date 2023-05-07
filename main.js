const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const main = function() {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const habits = initialize(habitsContent);
  habits.add("Jogging", "07 may 2023");
  console.log(habits);
  habits.track("Running", "showedUp", 30);
  habits.track("Running", "showedUp", 30);
  habits.track("Running", "showedUp", 30);
  console.table(habits.progress("Running"));
  habits.track("Running", "missed", 30);
  console.log(habits.activities);
  habits.save();

};

main();
