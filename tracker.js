const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const isValidCommand = function(program, command) {
  return Object.keys(program).includes(command);
}

const main = function([command, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const habits = initialize(habitsContent);

  if(!isValidCommand(habits, command)) {
    console.log(`tracker: Not a valid command : ${command}`);
    return;
  }

  const progress = habits[command](activity, ...args);
  console.table(progress);
  fs.writeFileSync("./resources/habits.json", JSON.stringify(habits.get(), null, 2));
};

main(process.argv.slice(2));
