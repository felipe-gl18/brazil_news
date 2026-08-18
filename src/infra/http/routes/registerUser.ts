import { Router } from "express";
import { RegisterUserController } from "../controllers/RegisterUserController.js";
import { UserRepositoryPrisma } from "../../prisma/UserRepositoryPrisma.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { NodeCryptoService } from "../../services/NodeCryptoService.js";
import { SystemDateService } from "../../services/SystemDateService.js";
import { CalculateNextDeliveryAt } from "../../../application/useCases/CalculateNextDeliveryAt.js";
import { UserService } from "../../../application/services/UserService.js";
import { TokenRepositoryPrisma } from "../../prisma/TokenRepositoryPrisma.js";
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

const registerUser = new RegisterUserController(userService);

route.post("", async (req, res, next) => registerUser.handle(req, res, next));

export { route as registerUserRoute };
