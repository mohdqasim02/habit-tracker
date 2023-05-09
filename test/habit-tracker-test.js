const {describe, it} = require("node:test");
const {deepStrictEqual} = require("assert");
const {initialize} = require("../src/habit-tracker.js");

describe("Tracker", function() {
  describe("add", function() {
    it("should add a new habit", function() {
      const tracker = initialize();
      const actual = tracker.add("Running", "07 may 2023");
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 0,
        showedUp: 0,
        missed: 0,
        time: 0,
      };

      deepStrictEqual(actual, expected);
    });

    it("should reset a habit if an existing habit is added again", function() {
      const tracker = initialize();
      const running = tracker.add("Running", "07 may 2023");
      const actual = tracker.add("Running", "07 may 2023");
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 0,
        showedUp: 0,
        missed: 0,
        time: 0,
      };

      deepStrictEqual(actual, expected);
    });
  });

  describe("track", function() {
    it("should add today's record to the respective habit and start a streak", function() {
      const tracker = initialize();
      const running = tracker.add("Running", "07 may 2023");
      const actual = tracker.track("Running", "showedUp", 30);
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 1,
        showedUp: 1,
        missed: 0,
        time: 30,
      };

      deepStrictEqual(actual, expected);
    });
  });

  describe("progress", function() {
    it("should give report of a habit", function() {
      const tracker = initialize();
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 1,
        showedUp: 1,
        missed: 0,
        time: 30,
      };

      tracker.add("Running", "07 may 2023");
      tracker.track("Running", "showedUp", 30);
      deepStrictEqual(tracker.progress("Running"), expected);
    });
  });
});
