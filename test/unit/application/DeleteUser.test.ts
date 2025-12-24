import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { DeleteUser } from "../../../src/application/useCases/DeleteUser.js";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";

describe("DeleteUser use case", () => {
  const user = {
    email: new Email("johndoe@gmail.com"),
    name: "John Doe",
    topics: ["fitness"],
    deliveryTime: new Date(),
    timezone: "south-america",
    nextDeliveryAt: new Date(),
  };
  const userRepository: IUserRepository = {
    async findUsersToNotify(now) {
      return null;
    },
    async create(user) {},
    async findAll() {
      return null;
    },
    async deleteById(id) {},
    async findByEmail(email) {
      return new User(user);
    },
    async findById(id) {
      return new User(user);
    },
    async save(user) {},
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
