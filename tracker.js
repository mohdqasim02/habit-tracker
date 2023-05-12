const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const isValidCommand = function(command) {
  const methods = ['add', 'track', 'progress', 'list', 'activities'];
  return methods.includes(command);
}

const main = function([command, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const tracker = initialize(JSON.parse(habitsContent));

  if(!isValidCommand(command)) {
    console.log(`tracker: Not a valid command : ${command}`);
    return;
  }

  const progress = tracker[command](activity, ...args);
  console.table(progress);
  fs.writeFileSync("./resources/habits.json", JSON.stringify(tracker.habits, null, 2));
};

main(process.argv.slice(2));