const {describe, it} = require("node:test");
const {strictEqual, deepStrictEqual} = require("assert");

describe("habit-tracker", function() {
  const counter = 0;

  it("should return a counter initialized with zero", function() {
    strictEqual(counter, 0);
  });
});
