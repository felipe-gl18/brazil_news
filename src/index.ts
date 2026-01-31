import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { CreateUser } from "./application/useCases/CreateUser.js";
import { UserRepositoryPrisma } from "./infra/prisma/UserRepositoryPrisma.js";
import "dotenv/config.js";
import { FindUser } from "./application/useCases/FindUser.js";
import { UpdateUser } from "./application/useCases/UpdateUser.js";
import { SendRSSNewsToUser } from "./application/useCases/SendRSSNewsToUser.js";
import { DeliveredNewsRepositoryPrisma } from "./infra/prisma/DeliveredNewsRepositoryPrisma.js";
import { RSSFetchNewsService } from "./infra/services/RSSFetchNewsService.js";
import { EmailNotificationService } from "./infra/services/EmailNotificationService.js";
import { FindUserDeliveredNews } from "./application/useCases/FindUserDeliveredNews.js";
import { FindDeliveredNews } from "./application/useCases/FindDeliveredNews.js";
import { DeleteUser } from "./application/useCases/DeleteUser.js";
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
const deliveredNewsRepository = new DeliveredNewsRepositoryPrisma(prismaClient);
const rSSFetchNewsService = new RSSFetchNewsService();
const emailNotificationService = new EmailNotificationService();
const nodeCronSchedulerService = new NodeCronSchedulerService();
const bullMQQueueService = new BullMQQueueService();
const systemDateService = new SystemDateService();
const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
const createUser = new CreateUser(
  userRepository,
  nodeCryptoService,
  systemDateService,
  calculateNextDeliveryAt,
);
const findUser = new FindUser(userRepository);
const updateUser = new UpdateUser(userRepository, systemDateService);
const sendRSSNewsToUser = new SendRSSNewsToUser(
  userRepository,
  deliveredNewsRepository,
  rSSFetchNewsService,
  emailNotificationService,
);
const findUserDeliveredNews = new FindUserDeliveredNews(
  deliveredNewsRepository,
);
const findDeliveredNews = new FindDeliveredNews(deliveredNewsRepository);
const deleteUser = new DeleteUser(userRepository);
const scheduleUserDeliveredNews = new ScheduleUserDeliveredNews(
  userRepository,
  nodeCronSchedulerService,
  bullMQQueueService,
  systemDateService,
  calculateNextDeliveryAt,
);
// create user
// find user
// update user
// sendRSSNews
// find user delivered news
// find all delivered news
// delete user
(async () => {
  /*  await createUser.execute({
    name: "Felipe Gadelha Lino",
    email: "felipegadelha2004@gmail.com",
    topics: ["technology"],
    timezone: "America/Sao_Paulo",
    deliveryTime: "1970-01-01T21:11:00",
  }); */
  await scheduleUserDeliveredNews.execute();
})();
