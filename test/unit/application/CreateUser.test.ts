import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { EmailAlreadyInUseError } from "../../../src/application/erros/EmailAlreadyInUseError.js";
import { CalculateNextDeliveryAt } from "../../../src/application/useCases/CalculateNextDeliveryAt.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { cryptoService } from "../../mocked_services/cryptoService.js";
import { systemDateService } from "../../mocked_services/systemDateService.js";
import { Language } from "../../../src/domain/entities/User.js";
import { NotificationChannel } from "../../../src/domain/enums/NotificationChannel.js";
import { userService } from "../../mocked_services/userService.js";
describe("CreateUser use case", () => {
  const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    topics: ["fitness"],
    deliveryTime: "2025-12-21T18:30:00.000Z",
    timezone: "South/America",
    language: "pt" as Language,
    notificationChannel: "EMAIL" as NotificationChannel,
  };
  it("should not allow create user if the email is already beign used", async () => {
    mock.method(userRepository, "create", () => {
      throw new EmailAlreadyInUseError("johndoe@gmail.com");
    });
    await assert.rejects(userService.create(user), EmailAlreadyInUseError);
  });
  it("should allow create user", async () => {
    mock.method(userRepository, "findByEmail", () => {
      return Promise.resolve(null);
    });
    const createMock = mock.method(userRepository, "create", () => {
      return Promise.resolve();
    });
    await assert.doesNotReject(userService.create(user));
    assert.equal(createMock.mock.calls.length, 1);
    const [createdUser] = createMock.mock.calls[0].arguments;
    assert.equal(createdUser?.name, user.name);
    assert.equal(createdUser?.email?.valueOf, user.email);
    assert.equal(createdUser?.timezone, user.timezone);
    assert.equal(createdUser?.deliveryTime, user.deliveryTime);
    assert.deepEqual(createdUser.topics, user.topics);
  });
});
