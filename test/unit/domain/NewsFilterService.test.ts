import { describe, it } from "node:test";
import assert from "assert";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";
import { News } from "../../../src/domain/entities/News.js";
import { NewsFilterService } from "../../../src/domain/services/NewsFilterService.js";

describe("NewsFilterService Domain Tests", () => {
  it("should return true if user interests match news topics", () => {
    const news = new News({
      title: "Node.js Tips",
      content: "Learn advanced Node.js patterns",
      topic: "technology",
      publishedAt: new Date(),
      link: "",
    });
    const result = NewsFilterService.matchUserInterests(
      new User({
        name: "John Doe",
        email: new Email("a@b.com"),
        topics: ["technology"],
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryTime: new Date(),
        timezone: "south-america",
        nextDeliveryAt: new Date(),
      }),
      news,
    );
    assert.equal(result, true);
  });
  it("should return false if user interests do not match news topics", () => {
    const news = new News({
      title: "Node.js Tips",
      content: "Learn advanced Node.js patterns",
      topic: "entertainment",
      publishedAt: new Date(),
      link: "",
    });

    const result = NewsFilterService.matchUserInterests(
      new User({
        name: "John Doe",
        email: new Email("a@b.com"),
        topics: ["technology"],
        createdAt: new Date(),
        updatedAt: new Date(),
        deliveryTime: new Date(),
        timezone: "south-america",
        nextDeliveryAt: new Date(),
      }),
      news,
    );
    assert.equal(result, false);
  });
});
