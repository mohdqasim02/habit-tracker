const assert = require('assert');
const { describe, it } = require('node:test');
const { createUsers } = require('../../src/models/users');
const { createHabits } = require('../../src/models/habits');

describe('Users', () => {
  describe('add', () => {
    it('should add a new user', () => {
      const users = createUsers([]);
      const credentials = {
        name: 'qasim',
        password: '1234'
      };

      assert.strictEqual(users.isValid(credentials), false);
      users.add(credentials);
      assert.strictEqual(users.isValid(credentials), true);
    });
  });

  describe('getHabits', () => {
    it('should respond with the habits of a particular user', () => {
      const credentials = {
        name: 'qasim',
        password: '1234',
        habits: []
      };
      const users = createUsers([credentials]);

      users.add(credentials);
      assert.deepStrictEqual(users.getHabits(credentials), createHabits([]));
    });

    it('should respond with -1 if the user does not exists', () => {
      const users = createUsers([]);
      const credentials = {
        name: 'qasim',
        password: '1234'
      };

      assert.deepStrictEqual(users.getHabits(credentials), -1);
    });
  });

  describe('usersData', () => {
    it('should give users data in json format', () => {
      const credentials = {
        name: 'qasim',
        password: '1234',
        habits: []
      };
      const users = createUsers([credentials]);

      assert.deepStrictEqual(users.usersData, [credentials]);
    });
  });
});