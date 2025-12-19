import { News } from "../../domain/entities/News.js";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewsFilterService } from "../../domain/services/NewsFilterService.js";
import { RSSNewsMapper } from "../mappers/RSSNewsMapper.js";
import { IFetchNewsService } from "../services/IFetchNewsService";
import { INotificationService } from "../services/INotificationService";
export class SendRSSNewsToUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly fetchNewsService: IFetchNewsService,
    private readonly notificationService: INotificationService
  ) {}
  async execute(userId: string) {
    const foundUser = await this.userRepository.findById(userId);
    const fetchedNewsDTOs = await this.fetchNewsService.fetchLatestNews(
      foundUser!.topics
    );
    const newsEntities = fetchedNewsDTOs.map((item) => new News(item));
    const releventNews = newsEntities.filter((news) =>
      NewsFilterService.matchUserInterests(foundUser!, news)
    );
    const deliveredNews = releventNews.map((news) =>
      RSSNewsMapper.toDeliveredNews(news, userId)
    );
    await this.deliveredNewsRepository.saveMany(deliveredNews, userId);
    const recipient = {
      email: foundUser!.email.valueOf,
      telegramChatId: foundUser!.whatsapp?.valueOf,
    };
    await this.notificationService.notify({
      news: releventNews,
      recipient,
    });
  }
}
