import { PrismaPg } from "@prisma/adapter-pg";
import { Router } from "express";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { UpdateAccountViewController } from "../controllers/updateAccountViewcontroller.js";
import { TokenRepositoryPrisma } from "../../prisma/TokenRepositoryPrisma.js";
import { SystemDateService } from "../../services/SystemDateService.js";
import { UserRepositoryPrisma } from "../../prisma/UserRepositoryPrisma.js";
import { CalculateNextDeliveryAt } from "../../../application/useCases/CalculateNextDeliveryAt.js";
import { DeliveredNewsRepositoryPrisma } from "../../prisma/DeliveredNewsRepositoryPrisma.js";
import { NodeCryptoService } from "../../services/NodeCryptoService.js";
import { UserService } from "../../../application/services/UserService.js";
const route = Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });
const tokenRepositoryPrisma = new TokenRepositoryPrisma(prismaClient);
const nodeCryptoService = new NodeCryptoService();
const systemDateService = new SystemDateService();
const userRepositoryPrisma = new UserRepositoryPrisma(
  prismaClient,
  nodeCryptoService,
);
const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
const tokenRepository = new TokenRepositoryPrisma(prismaClient);
const deliveredNewsRepository = new DeliveredNewsRepositoryPrisma(prismaClient);
const userService = new UserService(
  userRepositoryPrisma,
  nodeCryptoService,
  tokenRepository,
  deliveredNewsRepository,
  systemDateService,
  calculateNextDeliveryAt,
);
const updateAccountView = new UpdateAccountViewController(
  userService,
  systemDateService,
);
route.get("", updateAccountView.handle.bind(updateAccountView));
export { route as updateAccountViewRoute };
