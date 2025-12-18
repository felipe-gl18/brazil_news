import { describe, it, mock } from "node:test";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { FindUserDeliveredNews } from "../../../src/application/useCases/FindUserDeliveredNews.js";
import assert from "node:assert/strict";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";

describe("FindUserDeliveredNews use case", () => {
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
  it("should not allow to fetch news if the user doesnt exist", async () => {
    mock.method(deliveredNewsRepository, "findByUser", () => {
      throw new UserNotFoundError();
    });
    const findUserDeliveredNews = new FindUserDeliveredNews(
      deliveredNewsRepository
    );
    await assert.rejects(
      findUserDeliveredNews.execute("id"),
      UserNotFoundError
    );
  });
  it("should allow to fetch news", async () => {
    const findMock = mock.method(
      deliveredNewsRepository,
      "findByUser",
      () => {}
    );
    const findUserDeliveredNews = new FindUserDeliveredNews(
      deliveredNewsRepository
    );
    await assert.doesNotReject(findUserDeliveredNews.execute("id"));
    assert.equal(findMock.mock.calls.length, 1);
    const [userId] = findMock.mock.calls[0].arguments;
    assert.deepEqual(userId, "id");
  });
});
