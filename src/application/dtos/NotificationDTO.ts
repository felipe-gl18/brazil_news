export interface NotificationRecipientDTO {
  email?: string;
  telegramChatId?: string;
  updateAccountLink: string;
}

export interface NotificationNewsDTO {
  title: string;
  link: string;
  content: string;
  publishedAt: Date;
}

export interface NotificationPayloadDTO {
  recipient: NotificationRecipientDTO;
  news: NotificationNewsDTO[];
}
