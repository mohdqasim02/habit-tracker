const {describe, it} = require("node:test");
const {strictEqual, deepStrictEqual} = require("assert");
const {create, track} = require("../src/habit-tracker.js");

describe("habit-tracker", function() {
  describe("create", function() {
    it("should give a new habit", function() {
      const actual = create("Running", "07 may 2023");
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
    it("should give a new habit", function() {
      const habit = create("Running", "07 may 2023");
      track(habit, "missed");
      track(habit, "showedUp", 30);

      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 1,
        showedUp: 1,
        missed: 1,
        time: 30,
      };
      deepStrictEqual(habit, expected);
    });

  });

});
