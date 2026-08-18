import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { UserRepositoryPrisma } from "./infra/prisma/UserRepositoryPrisma.js";
import "dotenv/config.js";
import { NodeCryptoService } from "./infra/services/NodeCryptoService.js";
import { ScheduleUserDeliveredNews } from "./application/useCases/ScheduleUserDeliveredNews.js";
import { NodeCronSchedulerService } from "./infra/services/NodeCronSchedulerService.js";
import { BullMQQueueService } from "./infra/services/BullMQQueueService.js";
import { CalculateNextDeliveryAt } from "./application/useCases/CalculateNextDeliveryAt.js";
import { SystemDateService } from "./infra/services/SystemDateService.js";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });
const nodeCryptoService = new NodeCryptoService();
const userRepository = new UserRepositoryPrisma(
  prismaClient,
  nodeCryptoService,
);

const nodeCronSchedulerService = new NodeCronSchedulerService();
const bullMQQueueService = new BullMQQueueService();
const systemDateService = new SystemDateService();
const calculateNextDeliveryAt = new CalculateNextDeliveryAt();

const scheduleUserDeliveredNews = new ScheduleUserDeliveredNews(
  userRepository,
  nodeCronSchedulerService,
  bullMQQueueService,
  systemDateService,
  calculateNextDeliveryAt,
);

(async () => {
  await scheduleUserDeliveredNews.execute();
})();
