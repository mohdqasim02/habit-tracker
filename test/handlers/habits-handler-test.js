const assert = require('assert');
const request = require('supertest');
const { describe, it, beforeEach } = require('node:test');

const { createApp } = require('../../src/app');
const { createHabits } = require('../../src/models/habits');

describe('Habit-Handlers', () => {
  let app;
  let habits;
  let storage;

  beforeEach(() => {
    storage = {
      write: (_, onSave) => onSave()
    };
    habits = createHabits([]);
    app = createApp(habits, storage);
  });

  describe('GET /habits', () => {
    it('should serve habits data', (_, done) => {
      request(app)
        .get('/habits')
        .expect(200)
        .expect('Content-type', /json/)
        .expect([])
        .end(done);
    });
  });

  describe('POST /habits', () => {
    it('should add a habit', (_, done) => {
      request(app)
        .post('/habits')
        .set('Content-type', 'application/json')
        .send({ activity: 'Running' })
        .expect(201)
        .end(done);
    });
  });
});