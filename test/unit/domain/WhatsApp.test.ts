import assert from "assert";
import { describe, it } from "node:test";
import { WhatsApp } from "../../../src/domain/valueObjects/WhatsApp";

describe("WhatsApp Value Object", () => {
  it("should not allow invalid whatsapp number", () => {
    assert.throws(() => new WhatsApp("12345"), {
      message: "Invalid WhatsApp number format",
    });
  });
  it("should allow valid whatsapp number", () => {
    const whatsapp = new WhatsApp("+12345678901");
    assert.equal(whatsapp.valueOf, "+12345678901");
  });
});
