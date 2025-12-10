import { PrismaClient } from "../../../generated/prisma/client";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserMapper } from "../mappers/UserMapper";

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}
  async create(user: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email.valueOf,
        topics: user.topics,
        whatsapp: user.whatsapp?.valueOf,
      },
    });
  }
  async deleteById(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
      include: {
        deliveredNews: true,
      },
    });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
      include: {
        deliveredNews: true,
      },
    });
    if (!user) return null;
    return UserMapper.toDomain(user);
  }
  async updateUserTopics(id: string, topics: string[]): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id,
      },
      data: { topics },
    });
  }
}
