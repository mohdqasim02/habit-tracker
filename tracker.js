const fs = require("fs");
const {initialize} = require("./src/habit-tracker.js");

const main = function([command, activity, ...args]) {
  const habitsContent = fs.readFileSync("./resources/habits.json", "utf-8");
  const tracker = initialize(JSON.parse(habitsContent));
  let message = '';

  try{
    message = tracker[command](activity, ...args);
  } catch(e) {
    message = `tracker: Not a valid command : ${command}\n`;
    message += tracker.usage();
  }
  
  console.log(message);
  fs.writeFileSync("./resources/habits.json", JSON.stringify(tracker.habits, null, 2));
};

main(process.argv.slice(2));