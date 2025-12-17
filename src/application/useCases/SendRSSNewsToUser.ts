import { News } from "../../domain/entities/News";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewsFilterService } from "../../domain/services/NewsFilterService.js";
import { RSSNewsMapper } from "../mappers/RSSNewsMapper.js";
import { IFetchRSSService } from "../services/IFetchRSSService";
import { INotificationService } from "../services/INotificationService";
export class SendRSSNewsToUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly fetchRSSService: IFetchRSSService,
    private readonly notificationService: INotificationService
  ) {}
  async execute(userId: string) {
    const foundUser = await this.userRepository.findById(userId);
    const fetchedNews = await this.fetchRSSService.fetchLatestNews(
      foundUser!.topics
    );
    const releventNews = fetchedNews.filter((news) =>
      NewsFilterService.matchUserInterests(foundUser!, news)
    );
    const deliveredNews = releventNews.map((news) =>
      RSSNewsMapper.toDeliveredNews(news, userId)
    );
    await this.deliveredNewsRepository.saveMany(deliveredNews, userId);
    const message = this.formatNewsMessage(releventNews);
    await this.notificationService.sendNewsEmail(
      foundUser!.email.valueOf,
      message
    );
    if (foundUser!.whatsapp) {
      await this.notificationService.sendNewsWhatsApp(
        foundUser!.whatsapp.valueOf,
        message
      );
    }
  }
  private formatNewsMessage(news: News[]): string {
    return news
      .map(
        (n) =>
          `📰 ${n.title}\n${
            n.content
          }\nPublicado: ${n.publishedAt.toISOString()}\n`
      )
      .join("\n");
  }
}
