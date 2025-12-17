import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { IFetchRSSService } from "../../../src/application/services/IFetchRSSService";
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
  const fetchRSSService: IFetchRSSService = {
    async fetchLatestNews(topics) {
      return [
        new News({
          content: "content",
          link: "",
          publishedAt: new Date(),
          title: "title",
          topic: "fitness",
          images: [""],
        }),
      ];
    },
  };
  const notificationService: INotificationService = {
    async sendNewsEmail(email, news) {},
    async sendNewsWhatsApp(phone, news) {},
  };
  it("should not allow to send RSS news to user if it doesn't exist", async () => {
    mock.method(userRepository, "findById", () => {
      throw new UserNotFoundError();
    });
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchRSSService,
      notificationService
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
      notificationService,
      "sendNewsEmail",
      () => {}
    );
    const sendNewsWhatsAppMock = mock.method(
      notificationService,
      "sendNewsWhatsApp",
      () => {}
    );
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchRSSService,
      notificationService
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
