import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { FindUser } from "../../../src/application/useCases/FindUser.js";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
describe("FindUser use case", () => {
  it("should not allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      throw new UserNotFoundError();
    });
    const findUser = new FindUser(userRepository);
    await assert.rejects(
      findUser.execute("johndoe@gmail.com"),
      UserNotFoundError
    );
  });
  it("should allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve({ id: "id", email: "johndoe@gmail.com" });
    });
    const findUser = new FindUser(userRepository);
    await assert.doesNotReject(findUser.execute("id"));
  });
});
