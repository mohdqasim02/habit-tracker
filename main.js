const fs = require("fs");
const {tracker} = require("./src/habit-tracker.js");

const main = function() {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const habits = tracker(habitsContent);
};

main();
