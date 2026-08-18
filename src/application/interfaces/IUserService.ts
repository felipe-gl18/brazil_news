import { DeliveredNews } from "../../domain/entities/DeliveredNews";
import { User } from "../../domain/entities/User";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export interface IUserService {
  findUser(email: string): Promise<User>;
  findUserByToken(email: string): Promise<User | null>;
  findUserDeliveredNews(userId: string): Promise<DeliveredNews[] | null>;
  create(data: CreateUserDTO): Promise<void>;
  update(token: string, data: UpdateUserDTO): Promise<void>;
  delete(userId: string): Promise<void>;
}
