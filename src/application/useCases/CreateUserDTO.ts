import { Language } from "../../domain/entities/User.js";
import { NotificationChannel } from "../../domain/enums/NotificationChannel.js";

export interface CreateUserDTO {
  name: string;
  email: string;
  topics: string[];
  telegramChatId?: string;
  notificationChannel: NotificationChannel;
  deliveryTime: string;
  timezone: string;
  language: Language;
}
