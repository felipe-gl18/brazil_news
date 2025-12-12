import { PrismaClient, Prisma } from "../../../generated/prisma/client";
import { DeliveredNews } from "../../domain/entities/DeliveredNews";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { RepositoryError } from "../errors/RepositoryError";
import { DeliveredNewsMapper } from "../mappers/DeliveredNewsMapper";

export class DeliveredNewsRepositoryPrisma implements IDeliveredNewsRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async create(deliveredNews: DeliveredNews): Promise<void> {
    try {
      await this.prismaClient.deliveredNews.create({
        data: deliveredNews,
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new RepositoryError(
          "Delivered news violates a unique constraint",
          error
        );
      }
      throw new RepositoryError("Failed to create delivered news", error);
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
      ) {
        throw new UserNotFoundError();
      }
      throw new RepositoryError(
        "Failed to delete delivered news from user",
        error
      );
    }
  }
  async findAll(): Promise<DeliveredNews[] | null> {
    try {
      const deliveredNews = await this.prismaClient.deliveredNews.findMany();
      if (!deliveredNews) return null;
      return deliveredNews.map((deliveredNew) =>
        DeliveredNewsMapper.toDomain(deliveredNew)
      );
    } catch (error: any) {
      throw new RepositoryError("Failed to find all delivered news", error);
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
      throw new RepositoryError("Failed to find all delivered news", error);
    }
  }
  async saveMany(deliveredNews: DeliveredNews[]): Promise<void> {
    try {
      await this.prismaClient.deliveredNews.createMany({
        data: deliveredNews,
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new RepositoryError(
          "One or more delivered news entries violates a unique constraint",
          error
        );
      }
      throw new RepositoryError("Failed to save many delivered news", error);
    }
  }
}
