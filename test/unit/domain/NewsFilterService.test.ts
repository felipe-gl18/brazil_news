import { describe, it } from "node:test";
import { Email } from "../../../src/domain/valueObjects/Email";
import { User } from "../../../src/domain/entities/User";
import { News } from "../../../src/domain/entities/News";
import { NewsFilterService } from "../../../src/domain/services/NewsFilterService";
import assert from "assert";

describe("NewsFilterService Domain Tests", () => {
  it("should return true if user interests match news topics", () => {
    const email = new Email("a@b.com");
    const user = new User({
      name: "John Doe",
      email,
      topics: ["fitness", "health", "technology"],
    });
    const news = new News({
      title: "Node.js Tips",
      content: "Learn advanced Node.js patterns",
      topics: ["fitness", "health"],
      publishedAt: new Date(),
    });

    const result = NewsFilterService.matchUserInterests(user, news);
    assert.equal(result, true);
  });
  it("should return false if user interests do not match news topics", () => {
    const email = new Email("a@b.com");
    const user = new User({
      name: "John Doe",
      email,
      topics: ["fitness", "health", "technology"],
    });
    const news = new News({
      title: "Node.js Tips",
      content: "Learn advanced Node.js patterns",
      topics: ["sports", "entertainment"],
      publishedAt: new Date(),
    });

    const result = NewsFilterService.matchUserInterests(user, news);
    assert.equal(result, false);
  });
});
