import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { DeleteUser } from "../../../src/application/useCases/DeleteUser.js";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";

describe("DeleteUser use case", () => {
  const userRepository: IUserRepository = {
    async create(user) {},
    async deleteById(id) {},
    async findByEmail(email) {
      return null;
    },
    async findById(id) {
      return null;
    },
    async updateUserTopics(id, topics) {},
  };
  it("should not allow delete user if user doesnt exist", async () => {
    mock.method(userRepository, "deleteById", () => {
      throw new UserNotFoundError();
    });
    const deleteUser = new DeleteUser(userRepository);
    await assert.rejects(deleteUser.execute("id"), UserNotFoundError);
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
    const deleteUser = new DeleteUser(userRepository);
    await assert.doesNotReject(deleteUser.execute("id"));
    assert.equal(deleteMock.mock.calls.length, 1);
    const [id] = deleteMock.mock.calls[0].arguments;
    assert.equal(id, "id");
  });
});
