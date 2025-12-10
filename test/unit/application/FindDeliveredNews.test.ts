import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { FindDeliveredNews } from "../../../src/application/useCases/FindDeliveredNews.js";

describe("FindDeliveredNews use case", () => {
  const deliveredNewsRepository: IDeliveredNewsRepository = {
    async findAll() {
      return null;
    },
    async findByUser(userId) {
      return null;
    },
    async create() {},
    async deleteByUser(userId) {},
  };
  it("should not allow to fetch news", async () => {
    mock.method(deliveredNewsRepository, "findAll", () => {
      throw new Error("DB failure");
    });
    const findNews = new FindDeliveredNews(deliveredNewsRepository);
    await assert.rejects(findNews.execute(), {
      message: "Something went wrong: DB failure",
    });
  });
  it("should allow to fetch news", async () => {
    mock.method(deliveredNewsRepository, "findAll", () => {
      return Promise.resolve({ title: "News title", content: "News content" });
    });
    const findNews = new FindDeliveredNews(deliveredNewsRepository);
    await assert.doesNotReject(findNews.execute());
  });
});
