const { describe, it } = require('node:test');
const { deepStrictEqual, strictEqual } = require('assert');
const Habit = require('../../src/models/habit');
const { createHabits } = require('../../src/models/habits');

describe('Habits', () => {
  describe('add', () => {
    it('should add a new habit', () => {
      const habits = createHabits([]);
      const running = new Habit('Running');

      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
    });

    it('should reset a habit if an existing habit is added again', () => {
      const habits = createHabits([]);
      const running = new Habit('Running');

      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
      strictEqual(habits.add('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), running.data());
    });
  });

  describe('remove', () => {
    it('should remove a habit from tracking', () => {
      const habits = createHabits([{
        'course': [],
        'streaks': [],
        'activity': 'Running',
        'startDate': new Date(),
      }]);
      const running = new Habit('Running');

      deepStrictEqual(habits.getHabit('Running'), running.data());
      strictEqual(habits.remove('Running'), true);
      deepStrictEqual(habits.getHabit('Running'), false);
    });
  });

  describe('track', () => {
    it('should add a record to the respective habit and start a streak', () => {
      const habits = createHabits([]);

      strictEqual(habits.add('Running'), true);
      strictEqual(habits.track('Running', 'yes', 30), true);
      strictEqual(habits.track('Jogging', 'yes', 30), false);
    });
  });

  describe('list', () => {
    it('should give all the activities that are being tracked', () => {
      const habits = createHabits([]);

      habits.add('Running');
      habits.add('Jogging');
      habits.add('Sleeping');
      deepStrictEqual(habits.list(), ['Running', 'Jogging', 'Sleeping']);
    });
  });
});
