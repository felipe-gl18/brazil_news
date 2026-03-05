import { User } from "../entities/User";

export interface ITokenRepository {
  save(token: string, userId: string, expiresAt: Date): Promise<void>;
  findByToken(token: string): Promise<User | null>;
  deleteToken(token: string): Promise<void>;
}
