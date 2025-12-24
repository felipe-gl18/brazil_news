import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { IFetchNewsService } from "../../../src/application/services/IFetchNewsService";
import { INotificationService } from "../../../src/application/services/INotificationService";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";
import { SendRSSNewsToUser } from "../../../src/application/useCases/SendRSSNewsToUser.js";
import assert from "node:assert/strict";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { TelegramChatId } from "../../../src/domain/valueObjects/TelegramChatId.js";
import { User } from "../../../src/domain/entities/User.js";

describe("SendRSSNewsToUser use case", () => {
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
  const deliveredNewsRepository: IDeliveredNewsRepository = {
    async findAll() {
      return null;
    },
    async findByUser(userId) {
      return null;
    },
    async save() {},
    async deleteByUser(userId) {},
    async saveMany() {},
  };
  const fetchNewsService: IFetchNewsService = {
    async fetchLatestNews(topics) {
      return [
        {
          content: "content",
          link: "",
          publishedAt: new Date(),
          title: "title",
          topic: "fitness",
        },
      ];
    },
  };
  const emailNotificationService: INotificationService = {
    async notify() {},
  };
  const telegramNotificationService: INotificationService = {
    async notify() {},
  };
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
