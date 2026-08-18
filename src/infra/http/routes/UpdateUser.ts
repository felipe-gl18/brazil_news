import { Router } from "express";
import { UpdateUserController } from "../controllers/UpdateUserController.js";
import { UserRepositoryPrisma } from "../../prisma/UserRepositoryPrisma.js";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { NodeCryptoService } from "../../services/NodeCryptoService.js";
import { SystemDateService } from "../../services/SystemDateService.js";
import { TokenRepositoryPrisma } from "../../prisma/TokenRepositoryPrisma.js";
import { CalculateNextDeliveryAt } from "../../../application/useCases/CalculateNextDeliveryAt.js";
import { UserService } from "../../../application/services/UserService.js";
import { DeliveredNewsRepositoryPrisma } from "../../prisma/DeliveredNewsRepositoryPrisma.js";

const route = Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });
const nodeCryptoService = new NodeCryptoService();

const userRepositoryPrisma = new UserRepositoryPrisma(
  prismaClient,
  nodeCryptoService,
);
const systemDateService = new SystemDateService();
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
const updateUserController = new UpdateUserController(userService);

route.post("/:token", async (req, res, next) =>
  updateUserController.handle(req, res, next),
);

export { route as updateUserRoute };
