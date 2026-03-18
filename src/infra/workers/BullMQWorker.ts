import { Worker } from "bullmq";
import { SendRSSNewsToUser } from "../../application/useCases/SendRSSNewsToUser.js";
import { UserRepositoryPrisma } from "../prisma/UserRepositoryPrisma.js";
import { DeliveredNewsRepositoryPrisma } from "../prisma/DeliveredNewsRepositoryPrisma.js";
import { RSSFetchNewsService } from "../services/RSSFetchNewsService.js";
import { EmailNotificationService } from "../services/EmailNotificationService.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import { NodeCryptoService } from "../services/NodeCryptoService.js";
import { TokenRepositoryPrisma } from "../prisma/TokenRepositoryPrisma.js";
import { SendUpdateAccountLink } from "../../application/useCases/SendUpdateAccountLink.js";
import { TelegramNotificationService } from "../services/TelegramNotificationService.js";
import { NotiticationDispatcherService } from "../services/NotificationDispatcherService.js";
import { LibretranslateTranslationService } from "../services/LibretranslateTranslationService.js";
const connection = { host: "127.0.0.1", port: 6379 };
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
const tokenRepository = new TokenRepositoryPrisma(prismaClient);
const rSSFetchNewsService = new RSSFetchNewsService();
const emailNotificationService = new EmailNotificationService();
const telegramNotificationService = new TelegramNotificationService();
const notificationDispatcherService = new NotiticationDispatcherService([
  emailNotificationService,
  telegramNotificationService,
]);
const sendUpdateAccountLink = new SendUpdateAccountLink(
  tokenRepository,
  nodeCryptoService,
);
const libretranslateTranslationService = new LibretranslateTranslationService();
const sendRSSNewsToUser = new SendRSSNewsToUser(
  userRepository,
  deliveredNewsRepository,
  rSSFetchNewsService,
  notificationDispatcherService,
  sendUpdateAccountLink,
  libretranslateTranslationService,
);
const worker = new Worker(
  "notifications",
  async (job) => {
    if (job.name !== "notify-user") return;
    await sendRSSNewsToUser.execute(job.data.userId);
  },
  { connection, concurrency: 5 },
);

worker.on("error", (err) => {
  console.error("Worker error:", err);
});
