import { PrismaClient, Prisma } from "../../../generated/prisma/client.js";
import { DeliveredNews } from "../../domain/entities/DeliveredNews.js";
import { LinkAlreadyInUseError } from "../../application/erros/LinkAlreadyInUse.js";
import { UserNotFoundError } from "../../application/erros/UserNotFoundError.js";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { DatabaseError } from "../errors/DatabaseError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import { DeliveredNewsMapper } from "../mappers/DeliveredNewsMapper.js";

export class DeliveredNewsRepositoryPrisma implements IDeliveredNewsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async findAll(): Promise<DeliveredNews[] | null> {
    try {
      const deliveredNews = await this.prismaClient.deliveredNews.findMany();
      if (!deliveredNews) return null;
      return deliveredNews.map((deliveredNew) =>
        DeliveredNewsMapper.toDomain(deliveredNew)
      );
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to find delivered news", error);
      throw new RepositoryError("Failed to find delivered news", error);
    }
  }
  async findByUser(userId: string): Promise<DeliveredNews[] | null> {
    try {
      const deliveredNewsByUser =
        await this.prismaClient.deliveredNews.findMany({
          where: {
            userId,
          },
        });
      if (!deliveredNewsByUser) return null;
      return deliveredNewsByUser.map((deliveredNew) =>
        DeliveredNewsMapper.toDomain(deliveredNew)
      );
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError(
          "Failed to find delivered news from user",
          error
        );
      throw new RepositoryError(
        "Failed to find delivered news from user",
        error
      );
    }
  }
  async save(deliveredNews: DeliveredNews): Promise<void> {
    try {
      await this.prismaClient.deliveredNews.create({
        data: deliveredNews,
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new LinkAlreadyInUseError(deliveredNews.link);
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to save delivered news", error);
      throw new RepositoryError("Failed to save delivered news", error);
    }
  }
  async saveMany(deliveredNews: DeliveredNews[]): Promise<void> {
    try {
      await this.prismaClient.deliveredNews.createMany({
        data: deliveredNews.map((item) =>
          DeliveredNewsMapper.toPersistence(item)
        ),
        skipDuplicates: true,
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new LinkAlreadyInUseError("");
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to save many delivered news", error);
      throw new RepositoryError("Failed to save many delivered news", error);
    }
  }
  async deleteByUser(userId: string): Promise<void> {
    try {
      await this.prismaClient.deliveredNews.deleteMany({
        where: {
          userId,
        },
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError(
          "Failed to delete delivered news from user",
          error
        );
      throw new RepositoryError(
        "Failed to delete delivered news from user",
        error
      );
    }
  }
}
