const { describe, it, run } = require("node:test");
const { deepStrictEqual } = require("assert");
const { Habit } = require("../src/habit");
const { isDeepStrictEqual } = require("util");

describe("Habit", function () {
  describe("longestDuration", function () {
    it("should be able to determine best performance till today", function () {
      const running = new Habit("running");
      running.entry("yes", 20);
      running.entry("yes", 30);

      const expected = running.course[1];

      deepStrictEqual(running.longestDuration(), expected);
    });
  });

  describe("streak", function () {
    it("should be able to determine largest streak and the current streak", function () {
      const running = new Habit("running");
      const expected = {
        current: 1,
        largest: 3,
      };

      running.entry("yes", 30);
      running.entry("yes", 20);
      running.entry("yes", 30);
      running.entry();
      running.entry("yes", 30);
      isDeepStrictEqual(running.streak(), expected);
    });
  });
});
