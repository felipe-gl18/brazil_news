import {
  NotificationNewsDTO,
  NotificationPayloadDTO,
} from "../../application/dtos/NotificationDTO";
import { INotificationService } from "../../application/services/INotificationService";

export class TelegramNotificationService implements INotificationService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  async notify(payload: NotificationPayloadDTO): Promise<void> {
    const response = await fetch(`${this.apiUrl}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: payload.recipient.telegramChatId,
        text: this.buildNewsHtml(payload.news),
        parse_mode: "HTML",
      }),
    });
    if (!response.ok)
      throw new Error("Failed to send Telegram notification", {
        cause: response.statusText,
      });
  }
  private buildNewsHtml(news: NotificationNewsDTO[]): string {
    return (
      `<b>📰 Brazil News</b>\n\n` +
      news
        .map(
          (item) =>
            `<a href="${item.link}">${item.title}</a>\n` +
            `<i>${item.publishedAt}</i>\n\n`,
        )
        .join("")
    );
  }
}
