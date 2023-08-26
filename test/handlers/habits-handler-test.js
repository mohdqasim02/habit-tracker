const assert = require("assert");
const request = require("supertest");
const { describe, it } = require("node:test");
const { createApp } = require("../../src/app");
const { createHabits } = require("../../src/models/habits");

describe("Habit-Handlers", () => {
  describe("GET /habits", () => {
    it("should serve habits data", (_, done) => {
      const habits = createHabits([]);
      const app = createApp(habits);

      request(app)
        .get('/habits')
        .expect(200)
        .expect('Content-type', /json/)
        .expect([])
        .end(done);
    });
  });
});