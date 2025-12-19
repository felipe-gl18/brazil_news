import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { IFetchNewsService } from "../../../src/application/services/IFetchNewsService";
import { INotificationService } from "../../../src/application/services/INotificationService";
import { UserNotFoundError } from "../../../src/domain/erros/UserNotFoundError.js";
import { News } from "../../../src/domain/entities/News.js";
import { SendRSSNewsToUser } from "../../../src/application/useCases/SendRSSNewsToUser.js";
import assert from "node:assert/strict";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { WhatsApp } from "../../../src/domain/valueObjects/WhatsApp.js";

describe("SendRSSNewsToUser use case", () => {
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
  const fetchRSSService: IFetchNewsService = {
    async fetchLatestNews(topics) {
      return [
        new News({
          content: "content",
          link: "",
          publishedAt: new Date(),
          title: "title",
          topic: "fitness",
        }),
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
      fetchRSSService,
      emailNotificationService
    );
    await assert.rejects(sendRSSNewsToUser.execute("id"), UserNotFoundError);
  });
  it("should allow send RSS news to user", async () => {
    mock.method(userRepository, "findById", () => {
      return {
        email: new Email("johndoe@gmail.com"),
        whatsapp: new WhatsApp("+5588992048450"),
        topics: ["fitness"],
      };
    });
    mock.method(fetchRSSService, "fetchLatestNews", () => {
      return [
        new News({
          content: "content",
          link: "link",
          title: "title",
          publishedAt: new Date(),
          topic: "fitness",
        }),
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
    const sendNewsWhatsAppMock = mock.method(
      emailNotificationService,
      "notify",
      () => {}
    );
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchRSSService,
      emailNotificationService
    );
    await assert.doesNotReject(sendRSSNewsToUser.execute("id"));
    assert.equal(saveManyMock.mock.calls[0].arguments[1], "id");
    assert.equal(
      sendNewsEmailMock.mock.calls[0].arguments[0],
      "johndoe@gmail.com"
    );
    assert.equal(
      sendNewsWhatsAppMock.mock.calls[0].arguments[0],
      "+5588992048450"
    );
  });
});
