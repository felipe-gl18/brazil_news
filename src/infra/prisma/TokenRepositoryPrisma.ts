import { PrismaClient, Prisma } from "../../../generated/prisma/client.js";
import { TokenAlreadyExistError } from "../../application/erros/TokenAlreadyExistError.js";
import { UserNotFoundError } from "../../application/erros/UserNotFoundError.js";
import { User } from "../../domain/entities/User.js";
import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { DatabaseError } from "../errors/DatabaseError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class TokenRepositoryPrisma implements ITokenRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async save(token: string, userId: string, expiresAt: Date): Promise<void> {
    try {
      await this.prismaClient.token.create({
        data: {
          token,
          userId,
          expiresAt,
        },
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new TokenAlreadyExistError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to save token", error);
      throw new RepositoryError("Failed to save token", error);
    }
  }
  async findByToken(token: string): Promise<User | null> {
    try {
      const tokenData = await this.prismaClient.token.findUnique({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });
      if (!tokenData) return null;
      return UserMapper.toDomain(tokenData.user);
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to find token", error);
      throw new RepositoryError("Failed to find token", error);
    }
  }
  async deleteToken(token: string): Promise<void> {
    try {
      await this.prismaClient.token.delete({
        where: {
          token,
        },
      });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to delete token", error);
      throw new RepositoryError("Failed to delete token", error);
    }
  }
}
