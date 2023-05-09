const { describe, it } = require("node:test");
const { strictEqual } = require("assert");
const { Habit } = require("../src/habit");

describe("Habit", function() {
  describe("incrementStreak", function() {
    const running = new Habit("running");
    
    it("should increase the current streak by one", function() {
      running.incrementStreak();
      strictEqual(running.streak, 1);
    });
    
    it("should increase the current streak by one", function() {
      running.incrementStreak();
      strictEqual(running.streak, 2);
    });
  });

  describe("incrementMissed", function() {
    const running = new Habit("running");

    it("should increase missed days count by one", function() {
      running.incrementMissed();
      strictEqual(running.missed, 1);
    });
    
    it("should increase missed days count by one", function() {
      running.incrementMissed();
      strictEqual(running.missed, 2);
    });
  });

  describe("incrementShowedUp", function() {
    const running = new Habit("running");

    it("should increase showed up days count by one", function() {
      running.incrementShowedUp();
      strictEqual(running.showedUp, 1);
    });
    
    it("should increase showed up days count by one", function() {
      running.incrementShowedUp();
      strictEqual(running.showedUp, 2);
    });
  });

  describe("updateCourse", function() {
    const running = new Habit("running");

    it("should accumulate the course in mins over given time", function() {
      running.updateCourse(20);
      strictEqual(running.course, 20);
    });
    
    it("should increase showed up days count by one", function() {
      running.updateCourse(30);
      strictEqual(running.course, 50);
    });
  });

  describe("updateBestPerformace", function() {
    const running = new Habit("running");

    it("should update the best performance to latest best performance", function() {
      running.updateBestPerformance(30);
      strictEqual(running.bestPerformance, 30);
    });

    it("should update the best performance to latest best performance", function() {
      running.updateBestPerformance(20);
      strictEqual(running.bestPerformance, 30);
    });
  });

  describe("updateLargestStreak", function() {
    const running = new Habit("running");
    
    it("should update the best performance to latest best performance", function() {
      running.incrementStreak();
      running.incrementStreak();
      running.incrementStreak();
      strictEqual(running.largestStreak, 3);
    });
    
    it("should update the best performance to latest best performance", function() {
      running.incrementStreak();
      running.incrementStreak();
      running.incrementStreak();
      running.incrementMissed();
      strictEqual(running.largestStreak, 6);
    });
  });
});