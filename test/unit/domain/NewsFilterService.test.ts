import { describe, it } from "node:test";
import assert from "assert";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";
import { News } from "../../../src/domain/entities/News.js";
import { NewsFilterService } from "../../../src/domain/services/NewsFilterService.js";

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
      topic: "fitness",
      publishedAt: new Date(),
      link: "",
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
      topic: "entertainment",
      publishedAt: new Date(),
      link: "",
    });

    const result = NewsFilterService.matchUserInterests(user, news);
    assert.equal(result, false);
  });
});
