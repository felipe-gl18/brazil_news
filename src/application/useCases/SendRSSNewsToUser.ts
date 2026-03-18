import { News } from "../../domain/entities/News.js";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewsFilterService } from "../../domain/services/NewsFilterService.js";
import { languages } from "../../utils/languages.js";
import { RSSNewsMapper } from "../mappers/RSSNewsMapper.js";
import { IFetchNewsService } from "../services/IFetchNewsService";
import { INotificationService } from "../services/INotificationService";
import { ITranslationService } from "../services/ITranslationService.js";
import { SendUpdateAccountLink } from "./SendUpdateAccountLink.js";
export class SendRSSNewsToUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly fetchNewsService: IFetchNewsService,
    private readonly notificationDispatcherService: INotificationService,
    private readonly sendUpdateAccountLink: SendUpdateAccountLink,
    private readonly translationService: ITranslationService,
  ) {}
  async execute(userId: string) {
    const foundUser = await this.userRepository.findById(userId);
    const language = foundUser.language;
    const fetchedNewsDTOs = await this.fetchNewsService.fetchLatestNews(
      foundUser!.topics,
    );
    const newsEntities = fetchedNewsDTOs.map((item) => new News(item));
    const releventNews = newsEntities.filter((news) =>
      NewsFilterService.matchUserInterests(foundUser!, news),
    );
    const deliveredNews = releventNews.map((news) =>
      RSSNewsMapper.toDeliveredNews(news, userId),
    );
    const updateAccountLink = await this.sendUpdateAccountLink.execute(userId);
    const recipient = {
      email: foundUser!.email.valueOf,
      telegramChatId: foundUser!.telegramChatId?.valueOf,
      updateAccountLink,
    };

    const translatedNews = await Promise.all(
      releventNews.map(async (item) => ({
        content: await this.translationService.translate(
          item.content,
          foundUser.language,
        ),
        title: await this.translationService.translate(
          item.title,
          foundUser.language,
        ),
        publishedAt: item.publishedAt.toLocaleDateString(
          `${languages[language].value}`,
          languages[language].dateFormat,
        ),
        link: item.link,
        topic: item.topic,
      })),
    );

    await this.notificationDispatcherService.notify({
      news: translatedNews,
      recipient,
    });
    await this.deliveredNewsRepository.saveMany(deliveredNews);
  }
}
