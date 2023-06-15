const { describe, it } = require("node:test");
const { deepStrictEqual } = require("assert");
const { Habit } = require("../src/habit");

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
    it("should generate streak for consecutive days", function () {
      const running = new Habit("running");
      const date = Date.parse(new Date());
      const expected = [{ start: date, end: date, streak: 0 }, { start: date }];

      running.entry("yes", 30);
      running.entry("yes", 20);
      running.entry("yes", 30);
      running.entry();
      running.entry("yes", 30);
      deepStrictEqual(running.streaks, expected);
    });
  });

  describe("longestStreak", function () {
    it("should be able to determine the longest streak", function () {
      const running = new Habit("running");
      const date = Date.parse(new Date());
      const expected = { start: date };

      running.entry("yes", 30);
      running.entry("yes", 20);
      running.entry("yes", 30);
      running.entry();
      running.entry("yes", 30);
      deepStrictEqual(running.longestStreak(), expected);
    });
  });

  describe("currentStreak", function () {
    it("should be able to determine the current streak", function () {
      const running = new Habit("running");
      const date = Date.parse(new Date());
      const expected = { start: date };

      running.entry("yes", 30);
      running.entry("yes", 20);
      running.entry("yes", 30);
      running.entry();
      running.entry("yes", 30);
      deepStrictEqual(running.currentStreak(), expected);
    });
  });


});
