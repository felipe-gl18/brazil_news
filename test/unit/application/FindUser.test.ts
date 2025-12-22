import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { FindUser } from "../../../src/application/useCases/FindUser.js";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";
describe("FindUser use case", () => {
  const user = {
    email: new Email("johndoe@gmail.com"),
    name: "John Doe",
    topics: ["fitness"],
    deliveryTime: new Date(),
    timezone: "south-america",
  };
  const userRepository: IUserRepository = {
    async create(user) {},
    async deleteById(id) {},
    async findByEmail(email) {
      return new User(user);
    },
    async findById(id) {
      return new User(user);
    },
    async save(user) {},
  };
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
