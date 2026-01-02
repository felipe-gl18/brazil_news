import { Router } from "express";
import { RegisterUser } from "../controllers/RegisterUser.js";
import { CreateUser } from "../../../application/useCases/CreateUser.js";
import { UserRepositoryPrisma } from "../../prisma/UserRepositoryPrisma.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { NodeCryptoService } from "../../services/NodeCryptoService.js";
import { SystemDateService } from "../../services/SystemDateService.js";
import { CalculateNextDeliveryAt } from "../../../application/useCases/CalculateNextDeliveryAt.js";

const route = Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });

const nodeCryptoService = new NodeCryptoService();

const userRepositoryPrisma = new UserRepositoryPrisma(
  prismaClient,
  nodeCryptoService
);
const systemDateService = new SystemDateService();
const calculateNextDeliveryAt = new CalculateNextDeliveryAt();

const createUser = new CreateUser(
  userRepositoryPrisma,
  nodeCryptoService,
  systemDateService,
  calculateNextDeliveryAt
);
const registerUser = new RegisterUser(createUser);

route.post("", async (req, res) => registerUser.handle(req, res));

export { route as registerUserRoute };
