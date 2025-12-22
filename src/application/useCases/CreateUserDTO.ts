export interface CreateUserDTO {
  name: string;
  email: string;
  topics: string[];
  telegramChatId?: string;
  deliveryTime: string;
  timezone: string;
}
