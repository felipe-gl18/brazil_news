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
import { AudioNotificationDispatcherService } from "../services/AudioNotificationDispatcherService.js";
import { GTTSService } from "../services/GTTSService.js";
import { NotificationChannel } from "../../domain/enums/NotificationChannel.js";
import { NotificationServiceRegistry } from "../services/NotificationServiceRegistry.js";
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
const notificationServiceRegistry = new NotificationServiceRegistry({
  [NotificationChannel.EMAIL]: emailNotificationService,
  [NotificationChannel.TELEGRAM]: telegramNotificationService,
  // [NotificationChannel.WHATSAPP]: whatsappNotificationService, // futuro
});
const audioNotificationDispatcherService =
  new AudioNotificationDispatcherService([telegramNotificationService]);
const sendUpdateAccountLink = new SendUpdateAccountLink(
  tokenRepository,
  nodeCryptoService,
);
const libretranslateTranslationService = new LibretranslateTranslationService();
const gttsService = new GTTSService();
const sendRSSNewsToUser = new SendRSSNewsToUser(
  userRepository,
  deliveredNewsRepository,
  rSSFetchNewsService,
  audioNotificationDispatcherService,
  notificationServiceRegistry,
  sendUpdateAccountLink,
  libretranslateTranslationService,
  gttsService,
);
const worker = new Worker(
  "notifications",
  async (job) => {
    try {
      console.log(`[Worker] Processing job ${job.id}`);
      console.log(`[Worker] Job name: ${job.name}`);
      console.log(`[Worker] Job data:`, job.data);

      if (job.name !== "notify-user") {
        console.log(`[Worker] Ignoring job ${job.id}: ${job.name}`);
        return;
      }
      await sendRSSNewsToUser.execute(job.data.userId);
      console.log(`[Worker] Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    connection,
    concurrency: 5,
  },
);
worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`[Worker] Job ${job?.id} failed:`, error);
});

worker.on("error", (error) => {
  console.error("[Worker] Worker error:", error);
});
