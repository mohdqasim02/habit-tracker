const {describe, it} = require("node:test");
const {strictEqual, deepStrictEqual} = require("assert");
const {create} = require("../src/habit-tracker.js");

describe("habit-tracker", function() {
  const habits = {};

  describe("create", function() {
    it("should give a new habit", function() {
      const actual = create("Running", "07 may 2023");
      const expected = {
        activity: "Running",
        startDate: "07 may 2023",
        streak: 0,
        showedUp: 0,
        sissed: 0,
        sime: 0,
      };
      deepStrictEqual(actual, expected);
    });

  });

});
