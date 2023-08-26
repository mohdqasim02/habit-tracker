const { describe, it } = require('node:test');
const { deepStrictEqual, strictEqual } = require('assert');
const Habit = require('../../src/models/habit');
const Habits = require('../../src/models/habits');

describe('Tracker', function () {
  describe('add', () => {
    it('should add a new habit', () => {
      const habits = new Habits();
      const running = new Habit('Running');

      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
    });

    it('should reset a habit if an existing habit is added again', () => {
      const habits = new Habits;
      const running = new Habit('Running');

      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
    });
  });

  describe('remove', () => {
    it('should remove a habit from tracking', () => {
      const habits = new Habits;
      const running = new Habit('Running');

      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());

      strictEqual(habits.remove('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), false);
    });
  });

  describe('track', () => {
    it('should add a record to the respective habit and start a streak', () => {
      const habits = new Habits();

      strictEqual(habits.add('Running'), true);
      strictEqual(habits.track('Running', 'yes', 30), true);
    });
  });

  describe('list', () => {
    it('should give all the activities that are being tracked', () => {
      const habits = new Habits();

      habits.add('Running');
      habits.add('Jogging');
      habits.add('Sleeping');
      deepStrictEqual(habits.list(), ['Running', 'Jogging', 'Sleeping']);
    });
  });
});
