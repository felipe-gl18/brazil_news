import { News } from "../../domain/entities/News.js";
import { NotificationChannel } from "../../domain/enums/NotificationChannel.js";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewsFilterService } from "../../domain/services/NewsFilterService.js";
import { languages } from "../../utils/languages.js";
import { RSSNewsMapper } from "../mappers/RSSNewsMapper.js";
import { IAudioNotificationService } from "../interfaces/IAudioNotificationService.js";
import { IFetchNewsService } from "../interfaces/IFetchNewsService.js";
import { INotificationServiceRegistry } from "../interfaces/INotificationServiceRegistry.js";
import { ITextToSpeechService } from "../interfaces/ITextToSpeechService.js";
import { ITranslationService } from "../interfaces/ITranslationService.js";
import { SendUpdateAccountLink } from "./SendUpdateAccountLink.js";
export class SendRSSNewsToUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly fetchNewsService: IFetchNewsService,
    private readonly audioNotificationDispatcherService: IAudioNotificationService,
    private readonly notificationServiceRegistry: INotificationServiceRegistry,
    private readonly sendUpdateAccountLink: SendUpdateAccountLink,
    private readonly translationService: ITranslationService,
    private readonly textToSpeechService: ITextToSpeechService,
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
      channel: foundUser!.notificationChannel,
      email: foundUser!.email?.valueOf,
      telegramChatId: foundUser!.telegramChatId?.value,
      updateAccountLink,
    };

    const translatedNews = await Promise.all(
      releventNews.map(async (item, index) => ({
        content: await this.translationService.translate(
          item.content,
          foundUser.language,
        ),
        title: await this.translationService.translate(
          `News ${index + 1}. ${item.title}`,
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

    const notificationService = this.notificationServiceRegistry.resolve(
      recipient.channel,
    );
    await notificationService.notify({ news: translatedNews, recipient });

    if (
      recipient.channel === NotificationChannel.TELEGRAM &&
      recipient.telegramChatId
    ) {
      const newsText = translatedNews
        .map((news) => `${news.title}. ${news.content}`)
        .join("\n\n");
      const audioBuffer = await this.textToSpeechService.textToSpeech(
        newsText,
        foundUser.language,
      );
      await this.audioNotificationDispatcherService.sendAudio(
        recipient.telegramChatId,
        audioBuffer,
        "🎧 Brazil News",
      );
    }

    await this.deliveredNewsRepository.saveMany(deliveredNews);
  }
}
