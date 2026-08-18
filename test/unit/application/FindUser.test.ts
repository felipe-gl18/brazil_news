import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { userService } from "../../mocked_services/userService.js";
describe("FindUser use case", () => {
  it("should not allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      throw new UserNotFoundError();
    });
    await assert.rejects(
      userService.findUser("johndoe@gmail.com"),
      UserNotFoundError,
    );
  });
  it("should allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve({ id: "id", email: "johndoe@gmail.com" });
    });
    await assert.doesNotReject(userService.findUser("id"));
  });
});
