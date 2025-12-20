import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { CreateUser } from "./application/useCases/CreateUser.js";
import { UserRepositoryPrisma } from "./infra/prisma/UserRepositoryPrisma.js";
import "dotenv/config.js";
import { FindUser } from "./application/useCases/FindUser.js";
import { UpdateUserTopcis } from "./application/useCases/UpdateUserTopics.js";
import { SendRSSNewsToUser } from "./application/useCases/SendRSSNewsToUser.js";
import { DeliveredNewsRepositoryPrisma } from "./infra/prisma/DeliveredNewsRepositoryPrisma.js";
import { RSSFetchNewsService } from "./infra/services/RSSFetchNewsService.js";
import { EmailNotificationService } from "./infra/services/EmailNotificationService.js";
import { FindUserDeliveredNews } from "./application/useCases/FindUserDeliveredNews.js";
import { FindDeliveredNews } from "./application/useCases/FindDeliveredNews.js";
import { DeleteUser } from "./application/useCases/DeleteUser.js";
import { NodeCryptoService } from "./infra/services/NodeCryptoService.js";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });
const nodeCryptoService = new NodeCryptoService();
const userRepository = new UserRepositoryPrisma(
  prismaClient,
  nodeCryptoService
);
const deliveredNewsRepository = new DeliveredNewsRepositoryPrisma(prismaClient);
const rSSFetchNewsService = new RSSFetchNewsService();
const emailNotificationService = new EmailNotificationService();
const createUser = new CreateUser(userRepository, nodeCryptoService);
const findUser = new FindUser(userRepository);
const updateUserTopics = new UpdateUserTopcis(userRepository);
const sendRSSNewsToUser = new SendRSSNewsToUser(
  userRepository,
  deliveredNewsRepository,
  rSSFetchNewsService,
  emailNotificationService
);
const findUserDeliveredNews = new FindUserDeliveredNews(
  deliveredNewsRepository
);
const findDeliveredNews = new FindDeliveredNews(deliveredNewsRepository);
const deleteUser = new DeleteUser(userRepository);
// create user
// find user
// update user topics
// sendRSSNews
// find user delivered news
// find all delivered news
// delete user
(async () => {})();
