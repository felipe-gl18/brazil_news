import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { DeleteUser } from "../../../src/application/useCases/DeleteUser";

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
    mock.method(userRepository, "findById", () => {
      return Promise.resolve(null);
    });
    const deleteUser = new DeleteUser(userRepository);
    await assert.rejects(deleteUser.execute("id"), {
      message: "User does not exist!",
    });
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
  it("should throw wrapped error when repository fails", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve({
        id: "id",
        email: "johndoe@gmail.com",
      });
    });
    mock.method(userRepository, "deleteById", () => {
      throw new Error("DB failure");
    });
    const deleteUser = new DeleteUser(userRepository);
    await assert.rejects(deleteUser.execute("id"), {
      message: "Something went wrong: DB failure",
    });
  });
});
