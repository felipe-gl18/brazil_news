import { PrismaClient, Prisma } from "../../../generated/prisma/client.js";
import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO.js";
import { ICryptoService } from "../../application/services/ICryptoService.js";
import { User } from "../../domain/entities/User.js";
import { EmailAlreadyInUseError } from "../../application/erros/EmailAlreadyInUseError.js";
import { UserNotFoundError } from "../../application/erros/UserNotFoundError.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { DatabaseError } from "../errors/DatabaseError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class UserRepositoryPrisma implements IUserRepository {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly cryptoService: ICryptoService
  ) {}
  async create(user: User, encrypted?: EncrytedPayload): Promise<void> {
    try {
      await this.prismaClient.user.create({
        data: UserMapper.toPersistence(user, encrypted),
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        throw new EmailAlreadyInUseError(user.email.valueOf);
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to create user", error);
    }
  }
  async findAll(): Promise<User[] | null> {
    try {
      const user = await this.prismaClient.user.findMany({
        include: {
          deliveredNews: true,
        },
      });
      return user.map((user) => {
        const decryptedTelegramChatId = user.telegramChatCiphertext
          ? this.cryptoService.decrypt({
              ciphertext: user.telegramChatCiphertext,
              authTag: user.telegramChatAuthTag!,
              iv: user.telegramChatIv!,
            })
          : undefined;
        return UserMapper.toDomain(user, decryptedTelegramChatId);
      });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to find user by email", error);
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      await this.prismaClient.user.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to delete user", error);
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUniqueOrThrow({
        where: { email },
        include: {
          deliveredNews: true,
        },
      });
      const decryptedTelegramChatId = user.telegramChatCiphertext
        ? this.cryptoService.decrypt({
            ciphertext: user.telegramChatCiphertext,
            authTag: user.telegramChatAuthTag!,
            iv: user.telegramChatIv!,
          })
        : undefined;
      return UserMapper.toDomain(user, decryptedTelegramChatId);
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to find user by email", error);
    }
  }
  async findById(id: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          deliveredNews: true,
        },
      });
      const decryptedTelegramChatId = user.telegramChatCiphertext
        ? this.cryptoService.decrypt({
            ciphertext: user.telegramChatCiphertext,
            authTag: user.telegramChatAuthTag!,
            iv: user.telegramChatIv!,
          })
        : undefined;
      return UserMapper.toDomain(user, decryptedTelegramChatId);
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to find user by id", error);
    }
  }
  async findUsersToNotify(now: Date): Promise<User[] | null> {
    try {
      const user = await this.prismaClient.user.findMany({
        where: {
          nextDeliveryAt: {
            lte: now,
          },
        },
      });
      return user.map((user) => {
        const decryptedTelegramChatId = user.telegramChatCiphertext
          ? this.cryptoService.decrypt({
              ciphertext: user.telegramChatCiphertext,
              authTag: user.telegramChatAuthTag!,
              iv: user.telegramChatIv!,
            })
          : undefined;
        return UserMapper.toDomain(user, decryptedTelegramChatId);
      });
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to find user by email", error);
    }
  }
  async save(user: User): Promise<void> {
    try {
      await this.prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: UserMapper.toPersistence(user),
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to save user", error);
      throw new RepositoryError("Failed to save user", error);
    }
  }
}
