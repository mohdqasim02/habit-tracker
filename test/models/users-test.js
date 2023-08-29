const assert = require('assert');
const { describe, it } = require('node:test');
const { Users } = require('../../src/models/users');
const { createHabits } = require('../../src/models/habits');

describe('Users', () => {
  describe('add', () => {
    it('should add a new user', () => {
      const users = new Users();
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
    it('should respond with the the habits of a particular user', () => {
      const users = new Users();
      const credentials = {
        name: 'qasim',
        password: '1234'
      };

      users.add(credentials);
      assert.deepStrictEqual(users.getHabits('qasim'), createHabits([]));
    });
  });
});