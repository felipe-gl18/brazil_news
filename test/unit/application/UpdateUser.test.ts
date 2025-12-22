import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { UpdateUser } from "../../../src/application/useCases/UpdateUser.js";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";

describe("UpdatedUserTopics use case", () => {
  const user = {
    email: new Email("johndoe@gmail.com"),
    name: "John Doe",
    topics: ["fitness"],
    deliveryTime: new Date(),
    timezone: "south-america",
  };
  const userRepository: IUserRepository = {
    async findUsersToNotify(now) {
      return null;
    },
    async create(user) {},
    async deleteById(id) {},
    async findAll() {
      return null;
    },
    async findByEmail(email) {
      return new User(user);
    },
    async findById(id) {
      return new User(user);
    },
    async save(user) {},
  };
  it("should not allow update user if user doesnt exist", async () => {
    mock.method(userRepository, "save", () => {
      throw new UserNotFoundError();
    });
    const updateUserTopics = new UpdateUser(userRepository);
    await assert.rejects(
      updateUserTopics.execute("id", {
        name: "John Doe",
        email: "johndoe@gmail.com",
        deliveryTime: new Date().toISOString(),
        timezone: "south-america",
        topics: ["technology"],
      }),
      UserNotFoundError
    );
  });
  it("should allow update user topics if user exist", async () => {
    mock.method(userRepository, "findById", () => {
      return Promise.resolve(
        new User({
          name: "John Doe",
          email: new Email("johndoe@gmail.com"),
          deliveryTime: new Date(),
          timezone: "south-america",
          topics: ["technology"],
        })
      );
    });
    const updateMock = mock.method(userRepository, "save", () => {
      return Promise.resolve();
    });
    const updateUser = new UpdateUser(userRepository);
    await assert.doesNotReject(
      updateUser.execute("id", {
        name: "John Doe",
        email: "johndoe@gmail.com",
        deliveryTime: new Date().toISOString(),
        timezone: "south-africa",
        topics: ["technology", "health"],
      })
    );
    assert.equal(updateMock.mock.calls.length, 1);
    const [result] = updateMock.mock.calls[0].arguments;
    assert.equal(result?.name, "John Doe");
    assert.equal(result?.email.valueOf, "johndoe@gmail.com");
    assert.equal(result?.timezone, "south-africa");
    assert.deepEqual(result?.topics, ["technology", "health"]);
  });
});
