import { describe, it, mock } from "node:test";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";
import { IScheduler } from "../../../src/application/services/IScheduler";
import { SendRSSNewsToUser } from "../../../src/application/useCases/SendRSSNewsToUser.js";
import { Email } from "../../../src/domain/valueObjects/Email.js";
import { User } from "../../../src/domain/entities/User.js";
import assert from "node:assert/strict";
import { ScheduleUserDeliveredNews } from "../../../src/application/useCases/ScheduleUserDeliveredNews.js";
import { IFetchNewsService } from "../../../src/application/services/IFetchNewsService";
import { IDeliveredNewsRepository } from "../../../src/domain/repositories/IDeliveredNewsRepository";
import { INotificationService } from "../../../src/application/services/INotificationService";
import { IQueueService } from "../../../src/application/services/IQueueService";

describe("ScheduleUserDeliveredNews use case", () => {
  const user = {
    email: new Email("johndoe@gmail.com"),
    name: "John Doe",
    topics: ["fitness"],
    deliveryTime: new Date(),
    timezone: "America/Sao_Paulo",
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
  const nodeCronSchedulerService: IScheduler = {
    async schedule(expression, timezone, task) {},
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
  const bullmqQueueService: IQueueService = {
    async addJob(userId) {},
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
  it("should allow scheduling user delivered news", async () => {
    mock.method(userRepository, "findAll", () => {
      return Promise.resolve([new User(user, "id")]);
    });
    const scheduleMock = mock.method(
      nodeCronSchedulerService,
      "schedule",
      () => {}
    );
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchNewsService,
      emailNotificationService
    );
    const scheduleUserDeliveredNews = new ScheduleUserDeliveredNews(
      userRepository,
      nodeCronSchedulerService,
      bullmqQueueService
    );
    await assert.doesNotReject(scheduleUserDeliveredNews.execute());
    const [expression, timezone, _] = scheduleMock.mock.calls[0].arguments;
    assert.equal(typeof expression, "string");
    assert.equal(timezone, "America/Sao_Paulo");
  });
});
