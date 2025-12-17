import { DeliveredNews } from "../../domain/entities/DeliveredNews.js";
import { News } from "../../domain/entities/News.js";

export class RSSNewsMapper {
  static toDeliveredNews(rssNews: News, userId: string): DeliveredNews {
    return new DeliveredNews({
      userId,
      link: rssNews.link,
      topic: rssNews.topic,
      sentAt: new Date(),
    });
  }
}
