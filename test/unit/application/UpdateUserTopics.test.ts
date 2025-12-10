import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { UpdateUserTopcis } from "../../../src/application/useCases/UpdateUserTopics.js";

describe("UpdatedUserTopics use case", () => {
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
  it("should not allow update user topics if user doesnt exist", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve(null);
    });
    const updateUserTopics = new UpdateUserTopcis(userRepository);
    await assert.rejects(updateUserTopics.execute("id", ["fitness"]), {
      message: "User not found",
    });
  });
  it("should allow update user topics if user exist", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve({
        id: "id",
        email: "johndoe@gmail.com",
      });
    });
    const updateMock = mock.method(userRepository, "updateUserTopics", () => {
      return Promise.resolve();
    });
    const updateUserTopics = new UpdateUserTopcis(userRepository);
    await assert.doesNotReject(updateUserTopics.execute("id", ["fitness"]));
    assert.equal(updateMock.mock.calls.length, 1);
    const [id, topics] = updateMock.mock.calls[0].arguments;
    assert.equal(id, "id");
    assert.deepEqual(topics, ["fitness"]);
  });
  it("should throw wrapped error when repository fails", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve({
        id: "id",
        email: "johndoe@gmail.com",
      });
    });
    mock.method(userRepository, "updateUserTopics", () => {
      throw new Error("DB failure");
    });
    const updateUserTopics = new UpdateUserTopcis(userRepository);
    await assert.rejects(updateUserTopics.execute("id", ["health"]), {
      message: "Something went wrong: DB failure",
    });
  });
});
