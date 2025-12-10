import assert from "assert";
import { describe, it } from "node:test";
import { News } from "../../../src/domain/entities/News.js";

describe("News Entity", () => {
  it("should not allow empty tittle", () => {
    assert.throws(
      () =>
        new News({
          title: "",
          content: "Some content",
          publishedAt: new Date(),
          topics: ["fitness"],
        }),
      {
        message: "Tittle cannot be empty",
      }
    );
  });
  it("should not allow empty content", () => {
    assert.throws(
      () =>
        new News({
          title: "Some title",
          content: "",
          publishedAt: new Date(),
          topics: ["fitness"],
        }),
      {
        message: "Content cannot be empty",
      }
    );
  });
  it("should read getters correctly", () => {
    const news = new News({
      title: "Some title",
      content: "Some content",
      publishedAt: new Date(),
      images: ["image1", "image2"],
      topics: ["fitness"],
    });
    assert.equal(news.title, "Some title");
    assert.equal(news.content, "Some content");
    assert.equal(news.publishedAt instanceof Date, true);
    assert.deepEqual(news.images, ["image1", "image2"]);
    assert.deepEqual(news.topics, ["fitness"]);
  });
});
