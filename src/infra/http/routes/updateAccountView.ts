import { PrismaPg } from "@prisma/adapter-pg";
import { Router } from "express";
import { PrismaClient } from "../../../../generated/prisma/client.js";
import { UpdateAccountViewController } from "../controllers/updateAccountViewcontroller.js";
import { FindUserByToken } from "../../../application/useCases/FindUserByToken.js";
import { TokenRepositoryPrisma } from "../../prisma/TokenRepositoryPrisma.js";
const route = Router();
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prismaClient = new PrismaClient({ adapter });
const tokenRepositoryPrisma = new TokenRepositoryPrisma(prismaClient);
const findUserByToken = new FindUserByToken(tokenRepositoryPrisma);
const updateAccountView = new UpdateAccountViewController(findUserByToken);
route.get("", async (req, res, next) =>
  updateAccountView.handle(req, res, next),
);
export { route as updateAccountViewRoute };
