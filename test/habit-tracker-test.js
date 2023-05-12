const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {initialize} = require("../src/habit-tracker.js");
const { Habit } = require("../src/habit.js");

describe("Tracker", function() {
  describe("add", function() {
    it("should add a new habit", function() {
      const tracker = initialize({});
      tracker.add("Running");

      const actual = tracker.habits["Running"];
      const expected = new Habit("Running");
      
      deepStrictEqual(actual, expected);
    });
    
    it("should reset a habit if an existing habit is added again", function() {
      const tracker = initialize({});
      tracker.add("Running");
      tracker.add("Running");
      
      const actual = tracker.habits["Running"];
      const expected = new Habit("Running");
      
      deepStrictEqual(actual, expected);
    });
  });
  
  describe("remove", function() {
    it("should remove a habit from tracking", function() {
      const tracker = initialize({});
      tracker.add("Running");
      tracker.remove("Running");
      
      const actual = tracker.habits["Running"];
      const expected = undefined;

      deepStrictEqual(actual, expected);
    });
  })

  describe("track", function() {
    it("should add today's record to the respective habit and start a streak", function() {
      const tracker = initialize({});
      tracker.add("Running");
      tracker.track("Running", "yes", 30);
      
      const actual = tracker.habits["Running"].course;
      const expected = [{
        accomplished: true,
        duration: 30,
        timeStamp: (new Date()).toDateString(),
      }]

      deepStrictEqual(actual, expected);
    });
  });
  
  describe("progress", function() {
    it("should give report of a habit", function() {
      const tracker = initialize({});
      tracker.add("Running");
      tracker.track("Running", "yes", 30);
      tracker.track("Running", "yes", 20);
      tracker.track("Running", "yes", 10);
      
      const actual = tracker.progress("Running");
      const expected = [{
        accomplished: true,
        duration: 30,
        timeStamp: (new Date()).toDateString(),
      },
      {
        accomplished: true,
        duration: 20,
        timeStamp: (new Date()).toDateString(),
      },
      {
        accomplished: true,
        duration: 10,
        timeStamp: (new Date()).toDateString(),
      },
    ];
    
      deepStrictEqual(tracker.progress("Running"), expected);
    });
  });

  describe("activities", function() {
    it("should be a able to get all the activities that are being tracked", function() {
      const tracker = initialize({});
      tracker.add("Running");
      tracker.add("Jogging");
      tracker.add("Sleeping");

      const actual = tracker.activities();
      const expected = ["Running", "Jogging", "Sleeping"];

      deepStrictEqual(actual, expected);
    })
  });
});