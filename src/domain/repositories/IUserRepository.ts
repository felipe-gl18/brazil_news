import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO.js";
import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User, encrypted?: EncrytedPayload): Promise<void>;
  findAll(): Promise<User[] | null>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findUsersToNotify(now: Date): Promise<User[] | null>;
  save(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}
