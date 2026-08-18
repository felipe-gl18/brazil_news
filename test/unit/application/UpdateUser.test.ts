import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { Language, User } from "../../../src/domain/entities/User.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { systemDateService } from "../../mocked_services/systemDateService.js";
import { tokenRepository } from "../../mocked_repositories/token_repository.js";
import { CalculateNextDeliveryAt } from "../../../src/application/useCases/CalculateNextDeliveryAt.js";
import { NotificationChannel } from "../../../src/domain/enums/NotificationChannel.js";
import { userService } from "../../mocked_services/userService.js";
describe("UpdatedUserTopics use case", () => {
  it("should not allow update user if user doesnt exist", async () => {
    mock.method(userRepository, "save", () => {
      throw new UserNotFoundError();
    });
    await assert.rejects(
      userService.update("id", {
        name: "John Doe",
        email: "johndoe@gmail.com",
        deliveryTime: new Date().toISOString(),
        timezone: "south-america",
        topics: ["technology"],
      }),
      UserNotFoundError,
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
          nextDeliveryAt: new Date(),
          language: "pt" as Language,
          notificationChannel: "EMAIL" as NotificationChannel,
        }),
      );
    });
    const updateMock = mock.method(userRepository, "save", () => {
      return Promise.resolve();
    });
    await assert.doesNotReject(
      userService.update("id", {
        name: "John Doe",
        email: "johndoe@gmail.com",
        deliveryTime: new Date().toISOString(),
        timezone: "south-africa",
        topics: ["technology", "health"],
      }),
    );
    assert.equal(updateMock.mock.calls.length, 1);
    const [result] = updateMock.mock.calls[0].arguments;
    assert.equal(result?.name, "John Doe");
    assert.equal(result?.email?.valueOf, "johndoe@gmail.com");
    assert.equal(result?.timezone, "south-africa");
    assert.deepEqual(result?.topics, ["technology", "health"]);
  });
});
