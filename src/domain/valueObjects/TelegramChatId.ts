export class TelegramChatId {
  constructor(private readonly chatId: string) {
    if (!/^-?\d+$/.test(chatId)) {
      throw new Error("Invalid Telegram chat ID format");
    }
  }

  get valueOf() {
    return this.chatId;
  }
}
