import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { deliveredNewsRepository } from "../../mocked_repositories/deliveredNews_repository.js";
import { userService } from "../../mocked_services/userService.js";

describe("FindUserDeliveredNews use case", () => {
  it("should not allow to fetch news if the user doesnt exist", async () => {
    mock.method(deliveredNewsRepository, "findByUser", () => {
      throw new UserNotFoundError();
    });

    await assert.rejects(
      userService.findUserDeliveredNews("id"),
      UserNotFoundError,
    );
  });
  it("should allow to fetch news", async () => {
    const findMock = mock.method(
      deliveredNewsRepository,
      "findByUser",
      () => {},
    );

    await assert.doesNotReject(userService.findUserDeliveredNews("id"));
    assert.equal(findMock.mock.calls.length, 1);
    const [userId] = findMock.mock.calls[0].arguments;
    assert.deepEqual(userId, "id");
  });
});
