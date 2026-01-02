import { describe, it, mock } from "node:test";
import { UserNotFoundError } from "../../../src/application/erros/UserNotFoundError.js";
import { SendRSSNewsToUser } from "../../../src/application/useCases/SendRSSNewsToUser.js";
import assert from "node:assert/strict";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { TelegramChatId } from "../../../src/domain/valueObjects/TelegramChatId.js";
import { userRepository } from "../../mocked_repositories/user_repository.js";
import { deliveredNewsRepository } from "../../mocked_repositories/deliveredNews_repository.js";
import { fetchNewsService } from "../../mocked_services/fetchNewsService.js";
import { emailNotificationService } from "../../mocked_services/emailNotificationService.js";
import { telegramNotificationService } from "../../mocked_services/telegramNotificationService.js";

describe("SendRSSNewsToUser use case", () => {
  it("should not allow to send RSS news to user if it doesn't exist", async () => {
    mock.method(userRepository, "findById", () => {
      throw new UserNotFoundError();
    });
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchNewsService,
      emailNotificationService
    );
    await assert.rejects(sendRSSNewsToUser.execute("id"), UserNotFoundError);
  });
  it("should allow send RSS news to user", async () => {
    mock.method(userRepository, "findById", () => {
      return {
        email: new Email("johndoe@gmail.com"),
        telegramChatId: new TelegramChatId("5588992048450"),
        topics: ["fitness"],
      };
    });
    mock.method(fetchNewsService, "fetchLatestNews", () => {
      return [
        {
          content: "content",
          link: "link",
          title: "title",
          publishedAt: new Date(),
          topic: "fitness",
        },
      ];
    });
    const saveManyMock = mock.method(
      deliveredNewsRepository,
      "saveMany",
      () => {}
    );
    const sendNewsEmailMock = mock.method(
      emailNotificationService,
      "notify",
      () => {}
    );
    const sendNewsTelegramMock = mock.method(
      telegramNotificationService,
      "notify",
      () => {}
    );
    const sendRSSNewsToUserEmail = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchNewsService,
      emailNotificationService
    );
    await assert.doesNotReject(sendRSSNewsToUserEmail.execute("id"));
    assert.deepEqual(sendNewsEmailMock.mock.calls[0].arguments[0]?.recipient, {
      email: "johndoe@gmail.com",
      telegramChatId: "5588992048450",
    });
    const sendRSSNewsToUserTelegram = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchNewsService,
      telegramNotificationService
    );
    await assert.doesNotReject(sendRSSNewsToUserTelegram.execute("id"));
    assert.deepEqual(
      sendNewsTelegramMock.mock.calls[0].arguments[0]?.recipient,
      {
        email: "johndoe@gmail.com",
        telegramChatId: "5588992048450",
      }
    );
  });
});
