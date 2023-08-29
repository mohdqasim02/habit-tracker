const request = require('supertest');
const { describe, it, beforeEach } = require('node:test');

const { createApp } = require('../../src/app');
const { createUsers } = require('../../src/models/users');

describe('Habit-Handlers', () => {
  let app;
  let users;
  let storage;

  beforeEach(() => {
    storage = {
      write: (_, onSave) => onSave()
    };
    users = createUsers([{
      'name': 'billa',
      'password': '1234',
      'habits': []
    }]);
    app = createApp(users, storage);
  });

  describe('GET /habits', () => {
    it('should serve habits data', (_, done) => {
      request(app)
        .get('/habits')
        .set('Cookie', 'name=billa; password=1234')
        .expect(200)
        .expect('Content-type', /json/)
        .expect([])
        .end(done);
    });
  });

  describe('GET /habits/:activity', () => {
    it('should serve a specific habit', (_, done) => {
      request(app)
        .get('/habits/Running')
        .set('Cookie', 'name=billa; password=1234')
        .expect(200)
        .expect('Content-type', /json/)
        .end(done);
    });
  });

  describe('POST /habits', () => {
    it('should add a habit', (_, done) => {
      request(app)
        .post('/habits')
        .set('Cookie', 'name=billa; password=1234')
        .set('Content-type', 'application/json')
        .send({ activity: 'Running' })
        .expect(201)
        .end(done);
    });
  });

  describe('DELETE /habits', () => {
    it('should remove a habit', (_, done) => {
      request(app)
        .delete('/habits')
        .set('Cookie', 'name=billa; password=1234')
        .send({ activity: 'Running' })
        .set('Content-type', 'application/json')
        .expect(204)
        .end(done);
    });
  });

  describe('POST /habits/:activity', () => {
    it('should not post into an untracked habit', (_, done) => {
      request(app)
        .post('/habits/Running')
        .set('Cookie', 'name=billa; password=1234')
        .send({ duration: 20 })
        .set('Content-type', 'application/json')
        .expect(400)
        .end(done);
    });
  });
});