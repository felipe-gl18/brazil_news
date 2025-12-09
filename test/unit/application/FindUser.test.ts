import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import assert from "node:assert/strict";
import { FindUser } from "../../../src/application/useCases/FindUser";

describe("FindUser use case", () => {
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
  it("should not allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    const findUser = new FindUser(userRepository);
    await assert.rejects(findUser.execute("johndoe@gmail.com"), {
      message: "User not found",
    });
  });
  it("should allow find user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve({ id: "id", email: "johndoe@gmail.com" });
    });
    const findUser = new FindUser(userRepository);
    await assert.doesNotReject(findUser.execute("id"));
  });
});
