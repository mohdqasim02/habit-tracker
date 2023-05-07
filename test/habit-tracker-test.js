const {describe, it} = require("node:test");
const {strictEqual, deepStrictEqual} = require("assert");
const {initialize} = require("../src/habit-tracker.js");

describe("habit-tracker", function() {
  const habits = initialize("{}");

  describe("add", function() {
    it("should give a new habit", function() {
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 0,
        showedUp: 0,
        missed: 0,
        time: 0,
      };

      habits.add("Running", "07 may 2023");
      deepStrictEqual(habits.progress("Running"), expected);
    });
  });

  describe("track", function() {
    it("should give a new habit", function() {
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 1,
        showedUp: 1,
        missed: 1,
        time: 30,
      };

      habits.track("Running", "missed");
      habits.track("Running", "showedUp", 30);
      deepStrictEqual(habits.progress("Running"), expected);
    });
  });

  describe("progress", function() {
    it("should give a new habit", function() {
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 1,
        showedUp: 1,
        missed: 1,
        time: 30,
      };

      deepStrictEqual(habits.progress("Running"), expected);
    });
  });
});
