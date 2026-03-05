import { Router } from "express";
import { UpdateUserController } from "../controllers/UpdateUserController.js";
import { UpdateUser } from "../../../application/useCases/UpdateUser.js";
import { UserRepositoryPrisma } from "../../prisma/UserRepositoryPrisma.js";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { NodeCryptoService } from "../../services/NodeCryptoService.js";
import { SystemDateService } from "../../services/SystemDateService.js";
import { TokenRepositoryPrisma } from "../../prisma/TokenRepositoryPrisma.js";
import { CalculateNextDeliveryAt } from "../../../application/useCases/CalculateNextDeliveryAt.js";

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
const tokenRepository = new TokenRepositoryPrisma(prismaClient);
const systemDateService = new SystemDateService();
const calculateNextDeliveryAt = new CalculateNextDeliveryAt();
const updateUser = new UpdateUser(
  userRepositoryPrisma,
  tokenRepository,
  calculateNextDeliveryAt,
  systemDateService,
);
const updateUserController = new UpdateUserController(updateUser);

route.post("/:token", async (req, res, next) =>
  updateUserController.handle(req, res, next),
);

export { route as updateUserRoute };
