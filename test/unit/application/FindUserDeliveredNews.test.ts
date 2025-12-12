import { describe, it, mock } from "node:test";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { FindUserDeliveredNews } from "../../../src/application/useCases/FindUserDeliveredNews.js";
import assert from "node:assert/strict";

describe("FindUserDeliveredNews use case", () => {
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
  const deliveredNewsRepository: IDeliveredNewsRepository = {
    async findAll() {
      return null;
    },
    async findByUser(userId) {
      return null;
    },
    async create() {},
    async deleteByUser(userId) {},
    async saveMany() {},
  };
  it("should not allow to fetch news if the user doesnt exist", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve(null);
    });
    const findUserDeliveredNews = new FindUserDeliveredNews(
      userRepository,
      deliveredNewsRepository
    );
    await assert.rejects(findUserDeliveredNews.execute("id"), {
      message: "User not found!",
    });
  });
  it("should allow to fetch news", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve({
        email: "johndoe@gmail.com",
        topics: ["fitness"],
      });
    });
    const findMock = mock.method(
      deliveredNewsRepository,
      "findByUser",
      () => {}
    );
    const findUserDeliveredNews = new FindUserDeliveredNews(
      userRepository,
      deliveredNewsRepository
    );
    await assert.doesNotReject(findUserDeliveredNews.execute("id"));
    assert.equal(findMock.mock.calls.length, 1);
    const [userId] = findMock.mock.calls[0].arguments;
    assert.deepEqual(userId, "id");
  });
});
