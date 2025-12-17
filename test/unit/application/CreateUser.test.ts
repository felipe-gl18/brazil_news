import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { CreateUser } from "../../../src/application/useCases/CreateUser.js";
import { EmailAlreadyInUseError } from "../../../src/domain/erros/EmailAlreadyInUseError.js";

describe("CreateUser use case", () => {
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
  it("should not allow create user if the email is already beign used", async () => {
    mock.method(userRepository, "create", () => {
      throw new EmailAlreadyInUseError("johndoe@gmail.com");
    });
    const createUser = new CreateUser(userRepository);
    await assert.rejects(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["fitness"],
      }),
      EmailAlreadyInUseError
    );
  });
  it("should allow create user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    const createMock = mock.method(userRepository, "create", () => {
      return Promise.resolve();
    });
    const createUser = new CreateUser(userRepository);
    await assert.doesNotReject(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["health"],
      })
    );
    assert.equal(createMock.mock.calls.length, 1);
    const [createdUser] = createMock.mock.calls[0].arguments;
    assert.equal(createdUser?.name, "John Doe");
    assert.deepEqual(createdUser.topics, ["health"]);
  });
});
