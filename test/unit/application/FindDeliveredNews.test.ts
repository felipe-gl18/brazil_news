import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { FindDeliveredNews } from "../../../src/application/useCases/FindDeliveredNews.js";
import { RepositoryError } from "../../../src/infra/errors/RepositoryError.js";
import { deliveredNewsRepository } from "../../mocked_repositories/deliveredNews_repository.js";

describe("FindDeliveredNews use case", () => {
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
