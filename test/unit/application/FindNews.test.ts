import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { INewsRepository } from "../../../src/domain/repositories/INewsRepository";
import { FindNews } from "../../../src/application/useCases/FindNews.js";

describe("FindNews use case", () => {
  const newsRepository: INewsRepository = {
    async findNews(topics) {
      return null;
    },
  };
  it("should not allow to fetch news", async () => {
    mock.method(newsRepository, "findNews", () => {
      throw new Error("RSS failure");
    });
    const findNews = new FindNews(newsRepository);
    await assert.rejects(findNews.execute(["fitness"]), {
      message: "Something went wrong: RSS failure",
    });
  });
  it("should allow to fetch news", async () => {
    mock.method(newsRepository, "findNews", () => {
      return Promise.resolve({ title: "News title", content: "News content" });
    });
    const findNews = new FindNews(newsRepository);
    await assert.doesNotReject(findNews.execute(["fitness"]));
  });
});
