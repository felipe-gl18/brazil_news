import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { userService } from "../../mocked_services/userService.js";

describe("DeleteUser use case", () => {
  it("should not allow delete user if user doesnt exist", async () => {
    mock.method(userRepository, "deleteById", () => {
      throw new UserNotFoundError();
    });
    await assert.rejects(userService.delete("id"), UserNotFoundError);
  });
  it("should allow delete user", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve({
        id: "id",
        email: "johndoe@gmail.com",
      });
    });
    const deleteMock = mock.method(userRepository, "deleteById", () => {
      return Promise.resolve();
    });
    await assert.doesNotReject(userService.delete("id"));
    assert.equal(deleteMock.mock.calls.length, 1);
    const [id] = deleteMock.mock.calls[0].arguments;
    assert.equal(id, "id");
  });
});
