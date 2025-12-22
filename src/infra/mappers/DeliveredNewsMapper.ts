import { DeliveredNews } from "../../domain/entities/DeliveredNews.js";

export class DeliveredNewsMapper {
  static toDomain(raw: any) {
    return new DeliveredNews(
      {
        link: raw.link,
        topic: raw.topic,
        userId: raw.userId,
        sentAt: raw.sentAt,
      },
      raw.id
    );
  }
  static toPersistence(deliveredNews: DeliveredNews) {
    return {
      link: deliveredNews.link,
      topic: deliveredNews.topic,
      userId: deliveredNews.userId,
    };
  }
}
