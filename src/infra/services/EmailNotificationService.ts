import { INotificationService } from "../../application/services/INotificationService";
import nodemailer, { Transporter } from "nodemailer";
import "dotenv/config";
import {
  NotificationNewsDTO,
  NotificationPayloadDTO,
} from "../../application/dtos/NotificationDTO";
const CREDENTIALS = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BRAZIL_NEWS_EMAIL,
    pass: process.env.BRAZIL_NEWS_PASSWORD,
  },
};
export class EmailNotificationService implements INotificationService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(CREDENTIALS);
  }
  async notify(payload: NotificationPayloadDTO): Promise<void> {
    try {
      const html = this.buildNewsHtml(payload.news);
      await this.transporter.sendMail({
        from: `"Brazil News" <${process.env.BRAZIL_NEWS_EMAIL}>`,
        to: payload.recipient.email,
        subject: "Brazil News",
        html,
      });
    } catch (error) {
      throw new Error("Failed to send email noticiation", { cause: error });
    }
  }
  private buildNewsHtml(news: NotificationNewsDTO[]): string {
    return `
      <h2>Brazil News</h2>
      <ul>
        ${news
          .map(
            (item) => `
            <li>
              <a href="${item.link}">
                <strong>${item.title}</strong>
              </a>
              <br />
              <small>${item.publishedAt.toDateString()}</small>
              <p>${item.content}</p>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }
}
