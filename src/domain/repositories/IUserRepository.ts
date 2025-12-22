import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO.js";
import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User, encrypted?: EncrytedPayload): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  save(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}
