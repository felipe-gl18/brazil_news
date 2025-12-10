import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateUserTopics(id: string, topics: string[]): Promise<void>;
  deleteById(id: string): Promise<void>;
}
