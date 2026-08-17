import { NotificationChannel } from "../../domain/enums/NotificationChannel";

export interface NotificationRecipientDTO {
  channel: NotificationChannel;
  email?: string;
  telegramChatId?: string;
  updateAccountLink: string;
}

export interface NotificationNewsDTO {
  title: string;
  link: string;
  content: string;
  publishedAt: string;
}

export interface NotificationPayloadDTO {
  recipient: NotificationRecipientDTO;
  news: NotificationNewsDTO[];
}
