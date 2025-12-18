import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DeliveredNews } from "../../../src/domain/entities/DeliveredNews.js";

describe("DeliveredNews Entity", () => {
  it("should not allow empty link", () => {
    assert.throws(
      () =>
        new DeliveredNews({
          link: "",
          topic: "fitness",
          userId: "id",
          sentAt: new Date(),
        })
    );
  });
  it("should not allow empty userId", () => {
    assert.throws(
      () =>
        new DeliveredNews({
          userId: "",
          link: "link",
          topic: "fitness",
          sentAt: new Date(),
        })
    );
  });
  it("should not allow empty topic", () => {
    assert.throws(
      () =>
        new DeliveredNews({
          userId: "id",
          link: "link",
          topic: "",
          sentAt: new Date(),
        })
    );
  });
  it("should read getters correctly", () => {
    const sentAt = new Date();
    const deliveredNews = new DeliveredNews({
      userId: "id",
      link: "link",
      topic: "fitness",
      sentAt,
    });
    assert.equal(deliveredNews.link, "link");
    assert.equal(deliveredNews.userId, "id");
    assert.equal(deliveredNews.topic, "fitness");
    assert.deepEqual(deliveredNews.sentAt, sentAt);
  });
});
