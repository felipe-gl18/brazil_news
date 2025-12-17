import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { FindDeliveredNews } from "../../../src/application/useCases/FindDeliveredNews.js";
import { RepositoryError } from "../../../src/infra/errors/RepositoryError.js";

describe("FindDeliveredNews use case", () => {
  const deliveredNewsRepository: IDeliveredNewsRepository = {
    async findAll() {
      return null;
    },
    async findByUser(userId) {
      return null;
    },
    async save() {},
    async deleteByUser(userId) {},
    async saveMany() {},
  };
  it("should not allow to fetch news", async () => {
    mock.method(deliveredNewsRepository, "findAll", () => {
      throw new RepositoryError("");
    });
    const findNews = new FindDeliveredNews(deliveredNewsRepository);
    await assert.rejects(findNews.execute(), RepositoryError);
  });
  it("should allow to fetch news", async () => {
    mock.method(deliveredNewsRepository, "findAll", () => {
      return Promise.resolve({ link: "", topic: "" });
    });
    const findNews = new FindDeliveredNews(deliveredNewsRepository);
    await assert.doesNotReject(findNews.execute());
  });
});
