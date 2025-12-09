import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { CreateUser } from "../../../src/application/useCases/CreateUser";

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
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve({ id: 1, email: "johndoe@gmail.com" });
    });
    const createUser = new CreateUser(userRepository);
    await assert.rejects(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["health"],
      }),
      {
        message: "Email already beign used",
      }
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
  it("should throw wrapped error when repository fails", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    mock.method(userRepository, "create", () => {
      throw new Error("DB failure");
    });
    const createUser = new CreateUser(userRepository);
    await assert.rejects(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["health"],
      }),
      {
        message: "Something went wrong: DB failure",
      }
    );
  });
});
