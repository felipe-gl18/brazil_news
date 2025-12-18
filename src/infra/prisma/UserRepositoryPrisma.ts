import { PrismaClient, Prisma } from "../../../generated/prisma/client.js";
import { User } from "../../domain/entities/User.js";
import { EmailAlreadyInUseError } from "../../domain/erros/EmailAlreadyInUseError.js";
import { UserNotFoundError } from "../../domain/erros/UserNotFoundError.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { DatabaseError } from "../errors/DatabaseError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import { UserMapper } from "../mappers/UserMapper.js";

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async create(user: User): Promise<void> {
    try {
      await this.prismaClient.user.create({
        data: UserMapper.toPersistence(user),
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
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaClient.user.findUniqueOrThrow({
        where: { email },
        include: {
          deliveredNews: true,
        },
      });
      return UserMapper.toDomain(user);
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
  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.prismaClient.user.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          deliveredNews: true,
        },
      });
      return UserMapper.toDomain(user);
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
  async updateUserTopics(id: string, topics: string[]): Promise<void> {
    try {
      await this.prismaClient.user.update({
        where: {
          id,
        },
        data: { topics },
      });
    } catch (error: any) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      )
        throw new UserNotFoundError();
      if (error instanceof Prisma.PrismaClientInitializationError)
        throw new DatabaseError("Failed to create user", error);
      throw new RepositoryError("Failed to update user topics", error);
    }
  }
}
