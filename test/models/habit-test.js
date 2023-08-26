const { describe, it } = require('node:test');
const { deepStrictEqual } = require('assert');
const Habit = require('../../src/models/habit');

describe('Habit', function () {
  describe('longestDuration', function () {
    it('should be able to determine best performance till today', function () {
      const running = new Habit('running');
      running.entry(true, 20);
      running.entry(true, 30);

      const expected = running.course[1];

      deepStrictEqual(running.longestDuration(), expected);
    });
  });

  describe('streak', function () {
    it('should generate streak for consecutive days', function () {
      const running = new Habit('running');
      const date = new Date();
      const expected = [{ start: date, end: date }, { start: date }];

      running.entry(true, 30);
      running.entry(true, 20);
      running.entry(true, 30);
      running.entry(false);
      running.entry(true, 30);
      deepStrictEqual(running.streaks, expected);
    });
  });

  describe('longestStreak', function () {
    it('should be able to determine the longest streak', function () {
      const running = new Habit('running');
      const date = new Date();
      const expected = { start: date };

      running.entry(true, 30);
      running.entry(true, 20);
      running.entry(true, 30);
      running.entry(false);
      running.entry(true, 30);
      deepStrictEqual(running.longestStreak(), expected);
    });
  });

  describe('currentStreak', function () {
    it('should be able to determine the current streak', function () {
      const running = new Habit('running');
      const date = new Date();
      const expected = { start: date };

      running.entry(true, 30);
      running.entry(true, 20);
      running.entry(true, 30);
      running.entry(true, 30);
      deepStrictEqual(running.currentStreak(), expected);
    });
  });
});
