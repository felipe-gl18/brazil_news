import { DeliveredNews } from "../entities/DeliveredNews.js";
export interface IDeliveredNewsRepository {
  findAll(): Promise<DeliveredNews[] | null>;
  findByUser(userId: string): Promise<DeliveredNews[] | null>;
  create(): Promise<void>;
  deleteByUser(userId: string): Promise<void>;
}
