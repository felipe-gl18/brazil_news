import { News } from "../../domain/entities/News";

export interface INotificationService {
  sendNewsEmail(email: string, news: string): Promise<void>;
  sendNewsWhatsApp(phone: string, news: string): Promise<void>;
}
