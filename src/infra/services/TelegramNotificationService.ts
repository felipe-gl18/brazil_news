import {
  NotificationNewsDTO,
  NotificationPayloadDTO,
} from "../../application/dtos/NotificationDTO";
import { IAudioNotificationService } from "../../application/interfaces/IAudioNotificationService";
import { INotificationService } from "../../application/interfaces/INotificationService";

export class TelegramNotificationService
  implements INotificationService, IAudioNotificationService
{
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

  async sendAudio(
    chatId: string,
    audio: Buffer,
    caption?: string,
  ): Promise<void> {
    const formData = new FormData();

    formData.append("chat_id", chatId);
    const arrayBuffer = audio.buffer.slice(
      audio.byteOffset,
      audio.byteOffset + audio.byteLength,
    ) as ArrayBuffer;

    formData.append(
      "audio",
      new Blob([arrayBuffer], { type: "audio/mpeg" }),
      "brazil-news.mp3",
    );

    if (caption) {
      formData.append("caption", caption);
    }

    const response = await fetch(`${this.apiUrl}/sendAudio`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send Telegram audio", {
        cause: response.statusText,
      });
    }
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
