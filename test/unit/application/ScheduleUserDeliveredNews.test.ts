import { describe, it, mock } from "node:test";
import { SendRSSNewsToUser } from "../../../src/application/useCases/SendRSSNewsToUser.js";
import { User } from "../../../src/domain/entities/User.js";
import assert from "node:assert/strict";
import { ScheduleUserDeliveredNews } from "../../../src/application/useCases/ScheduleUserDeliveredNews.js";
import { CalculateNextDeliveryAt } from "../../../src/application/useCases/CalculateNextDeliveryAt.js";
import {
  user,
  userRepository,
} from "../../mocked_repositories/user_repository.js";
import { deliveredNewsRepository } from "../../mocked_repositories/deliveredNews_repository.js";
import { nodeCronSchedulerService } from "../../mocked_services/nodeCronSchedulerService.js";
import { bullmqQueueService } from "../../mocked_services/bullmqQueueService.js";
import { fetchNewsService } from "../../mocked_services/fetchNewsService.js";
import { emailNotificationService } from "../../mocked_services/emailNotificationService.js";
import { systemDateService } from "../../mocked_services/systemDateService.js";
describe("ScheduleUserDeliveredNews use case", () => {
  it("should allow scheduling user delivered news", async () => {
    mock.method(userRepository, "findAll", () => {
      return Promise.resolve([new User(user, "id")]);
    });
    const scheduleMock = mock.method(
      nodeCronSchedulerService,
      "schedule",
      () => {},
    );
    const sendRSSNewsToUser = new SendRSSNewsToUser(
      userRepository,
      deliveredNewsRepository,
      fetchNewsService,
      emailNotificationService,
    );
    const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
    const scheduleUserDeliveredNews = new ScheduleUserDeliveredNews(
      userRepository,
      nodeCronSchedulerService,
      bullmqQueueService,
      systemDateService,
      calculateNextDeliveryAt,
    );
    await assert.doesNotReject(scheduleUserDeliveredNews.execute());
    const [expression, _] = scheduleMock.mock.calls[0].arguments;
    assert.equal(typeof expression, "string");
  });
});
