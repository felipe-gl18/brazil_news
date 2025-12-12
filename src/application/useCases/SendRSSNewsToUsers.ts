import { News } from "../../domain/entities/News";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewsFilterService } from "../../domain/services/NewsFilterService";
import { RSSNewsMapper } from "../mappers/RSSNewsMapper";
import { IFetchRSSService } from "../services/IFetchRSSService";
import { INotificationService } from "../services/INotificationService";

export class SendRSSNewsToUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly fetchRSSService: IFetchRSSService,
    private readonly notificationService: INotificationService
  ) {}

  async execute(id: string) {
    // Verify if user exists
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) throw new Error("User not found!");

    const fetchedNews = await this.fetchRSSService.fetchLatestNews(
      foundUser.topics
    );

    const releventNews = fetchedNews.filter((news) =>
      NewsFilterService.matchUserInterests(foundUser, news)
    );

    const deliveredNews = releventNews.map((news) =>
      RSSNewsMapper.toDeliveredNews(news, id)
    );

    await this.deliveredNewsRepository.saveMany(deliveredNews);

    const message = this.formatNewsMessage(releventNews);
    // error handling
    try {
      await this.notificationService.sendNewsEmail(
        foundUser.email.valueOf,
        message
      );
      if (foundUser.whatsapp) {
        await this.notificationService.sendNewsWhatsApp(
          foundUser.whatsapp.valueOf,
          message
        );
      }
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
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
