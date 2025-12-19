import assert from "assert";
import { describe, it } from "node:test";
import { TelegramChatId } from "../../../src/domain/valueObjects/TelegramChatId.js";

describe("WhatsApp Value Object", () => {
  it("should not allow invalid telegram chat id", () => {
    assert.throws(() => new TelegramChatId("@@12345"), {
      message: "Invalid Telegram chat ID format",
    });
  });
  it("should allow valid telegram chat id", () => {
    const whatsapp = new TelegramChatId("12345678901");
    assert.equal(whatsapp.valueOf, "12345678901");
  });
});
