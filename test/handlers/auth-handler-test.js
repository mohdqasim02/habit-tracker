const request = require('supertest');
const { describe, it, beforeEach } = require('node:test');
const { createApp } = require('../../src/app');
const { createUsers } = require('../../src/models/users');

describe('Auth-Handlers', () => {
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

  describe('authenticate', () => {
    it('should call the next handler if user is logged in', (_, done) => {
      request(app)
        .get('/habits')
        .set('Cookie', 'name=billa; password=1234')
        .expect(200)
        .expect('Content-type', /json/)
        .expect([])
        .end(done);
    });
  });

  describe('loginPage', () => {
    it('should serve login page if user in not logged in', (_, done) => {
      request(app)
        .get('/login')
        .expect(200)
        .end(done);
    });

    it('should serve home page if user is logged in', (_, done) => {
      request(app)
        .get('/login')
        .set('Cookie', 'name=billa; password=1234')
        .expect(303)
        .end(done);
    });
  });

  describe('login', () => {
    it('should login a user if he signed up', (_, done) => {
      request(app)
        .post('/login')
        .send({ name: 'billa', password: '1234' })
        .expect(303)
        .expect('location', '/')
        .end(done);
    });

    it('should redirect to signup if a user is not signed up', (_, done) => {
      request(app)
        .post('/login')
        .send({ name: 'qasim', password: '1234' })
        .expect(303)
        .expect('location', '/signup')
        .end(done);
    });
  });

  describe('signupPage', () => {
    it('should serve signup page if user in not registered', (_, done) => {
      request(app)
        .get('/signup')
        .expect(200)
        .end(done);
    });

    it('should serve login page if user is already registered', (_, done) => {
      request(app)
        .get('/signup')
        .set('Cookie', 'name=billa; password=1234')
        .expect(303)
        .end(done);
    });
  });

  describe('signup', () => {
    it('should signup a user and redirect to home', (_, done) => {
      request(app)
        .post('/signup')
        .send({ name: 'qasim', password: '1234' })
        .expect(303)
        .expect('location', '/')
        .end(done);
    });

    it('should login and redirect to home if a user is registered', (_, done) => {
      request(app)
        .post('/signup')
        .send({ name: 'qasim', password: '1234' })
        .expect(303)
        .expect('location', '/')
        .end(done);
    });
  });
});