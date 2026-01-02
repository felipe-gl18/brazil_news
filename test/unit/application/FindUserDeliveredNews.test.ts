import { describe, it, mock } from "node:test";
import { FindUserDeliveredNews } from "../../../src/application/useCases/FindUserDeliveredNews.js";
import assert from "node:assert/strict";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { deliveredNewsRepository } from "../../mocked_repositories/deliveredNews_repository.js";

describe("FindUserDeliveredNews use case", () => {
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
