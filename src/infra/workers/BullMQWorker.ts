import { Worker } from "bullmq";
import { SendRSSNewsToUser } from "../../application/useCases/SendRSSNewsToUser.js";
import { UserRepositoryPrisma } from "../prisma/UserRepositoryPrisma.js";
import { DeliveredNewsRepositoryPrisma } from "../prisma/DeliveredNewsRepositoryPrisma.js";
import { RSSFetchNewsService } from "../services/RSSFetchNewsService.js";
import { EmailNotificationService } from "../services/EmailNotificationService.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";
import { NodeCryptoService } from "../services/NodeCryptoService.js";
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
const rSSFetchNewsService = new RSSFetchNewsService();
const emailNotificationService = new EmailNotificationService();
const sendRSSNewsToUser = new SendRSSNewsToUser(
  userRepository,
  deliveredNewsRepository,
  rSSFetchNewsService,
  emailNotificationService,
);
const worker = new Worker(
  "notifications",
  async (job) => {
    console.log("Processing job:", job.id, job.name);
    if (job.name !== "notify-user") return;
    await sendRSSNewsToUser.execute(job.data.userId);
  },
  { connection, concurrency: 5 },
);

worker.on("error", (err) => {
  console.error("Worker error:", err);
});
