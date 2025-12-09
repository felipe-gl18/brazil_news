import { describe, it, mock } from "node:test";
import { INewsRepository } from "../../../src/domain/repositories/INewsRepository";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { FetchUserNews } from "../../../src/application/useCases/FetchUserNews";
import assert from "node:assert/strict";

describe("FetchUserNews use case", () => {
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
  const newsRepository: INewsRepository = {
    async findNews(topics) {
      return null;
    },
  };
  it("should not allow to fetch news if the user doesnt exist", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    const fetchUserNews = new FetchUserNews(userRepository, newsRepository);
    await assert.rejects(fetchUserNews.execute("johndoe@gmail.com"), {
      message: "User not found!",
    });
  });
  it("should allow to fetch news", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve({
        email: "johndoe@gmail.com",
        topics: ["fitness"],
      });
    });
    const findMock = mock.method(newsRepository, "findNews", () => {});
    const fetchUserNews = new FetchUserNews(userRepository, newsRepository);
    await assert.doesNotReject(fetchUserNews.execute("johndoe@gmail.com"));
    assert.equal(findMock.mock.calls.length, 1);
    const [topics] = findMock.mock.calls[0].arguments;
    assert.deepEqual(topics, ["fitness"]);
  });
});
