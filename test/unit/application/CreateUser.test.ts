import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { CreateUser } from "../../../src/application/useCases/CreateUser.js";
import { EmailAlreadyInUseError } from "../../../src/domain/erros/EmailAlreadyInUseError.js";
import { CalculateNextDeliveryAt } from "../../../src/application/useCases/CalculateNextDeliveryAt.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { cryptoService } from "../../mocked_services/cryptoService.js";
import { systemDateService } from "../../mocked_services/systemDateService.js";
describe("CreateUser use case", () => {
  const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
  const user = {
    email: "johndoe@gmail.com",
    name: "John Doe",
    topics: ["fitness"],
    deliveryTime: "2025-12-21T18:30:00.000Z",
    timezone: "south-america",
  };
  it("should not allow create user if the email is already beign used", async () => {
    mock.method(userRepository, "create", () => {
      throw new EmailAlreadyInUseError("johndoe@gmail.com");
    });
    const createUser = new CreateUser(
      userRepository,
      cryptoService,
      systemDateService,
      calculateNextDeliveryAt
    );
    await assert.rejects(createUser.execute(user), EmailAlreadyInUseError);
  });
  it("should allow create user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    const createMock = mock.method(userRepository, "create", () => {
      return Promise.resolve();
    });
    const createUser = new CreateUser(
      userRepository,
      cryptoService,
      systemDateService,
      calculateNextDeliveryAt
    );
    await assert.doesNotReject(createUser.execute(user));
    assert.equal(createMock.mock.calls.length, 1);
    const [createdUser] = createMock.mock.calls[0].arguments;
    assert.equal(createdUser?.name, "John Doe");
    assert.deepEqual(createdUser.topics, ["health"]);
  });
});
