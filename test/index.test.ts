const { describe, it } = require("node:test");
const assert = require("node:assert");

describe("basic test", () => {
  it("works", () => {
    assert.equal(1 + 1, 2);
  });
});
