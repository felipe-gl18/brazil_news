import assert from "assert";
import { describe, it } from "node:test";
import { Email } from "../../../src/domain/valueObjects/Email";

describe("Email Value Object", () => {
  it("should not allow invalid email", () => {
    assert.throws(() => new Email("invalid-email"), {
      message: "Invalid email format",
    });
    assert.throws(() => new Email("another-invalid-email@"), {
      message: "Invalid email format",
    });
    assert.throws(() => new Email("no-at-symbol.com"), {
      message: "Invalid email format",
    });
  });
  it("should allow valid email", () => {
    const email = new Email("johndoe@example.com");
    assert.equal(email.valueOf, "johndoe@example.com");
  });
});
