import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { CreateUser } from "../../../src/application/useCases/CreateUser.js";
import { EmailAlreadyInUseError } from "../../../src/domain/erros/EmailAlreadyInUseError.js";
import { ICryptoService } from "../../../src/application/services/ICryptoService";
import { User } from "../../../src/domain/entities/User.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";

describe("CreateUser use case", () => {
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
  const cryptoService: ICryptoService = {
    encrypt() {
      return {
        authTag: "",
        ciphertext: "",
        iv: "",
      };
    },
    decrypt() {
      return "";
    },
  };
  it("should not allow create user if the email is already beign used", async () => {
    mock.method(userRepository, "create", () => {
      throw new EmailAlreadyInUseError("johndoe@gmail.com");
    });
    const createUser = new CreateUser(userRepository, cryptoService);
    await assert.rejects(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["fitness"],
        deliveryTime: "2025-12-21T18:30:00.000Z",
        timezone: "south-america",
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
    const createUser = new CreateUser(userRepository, cryptoService);
    await assert.doesNotReject(
      createUser.execute({
        email: "johndoe@gmail.com",
        name: "John Doe",
        topics: ["health"],
        deliveryTime: "2025-12-21T18:30:00.000Z",
        timezone: "south-america",
      })
    );
    assert.equal(createMock.mock.calls.length, 1);
    const [createdUser] = createMock.mock.calls[0].arguments;
    assert.equal(createdUser?.name, "John Doe");
    assert.deepEqual(createdUser.topics, ["health"]);
  });
});
