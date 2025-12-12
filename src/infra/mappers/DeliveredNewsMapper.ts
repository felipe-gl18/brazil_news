import { DeliveredNews } from "../../domain/entities/DeliveredNews";

export class DeliveredNewsMapper {
  static toDomain(raw: any) {
    return new DeliveredNews({
      link: raw.link,
      topic: raw.topic,
      userId: raw.userId,
    });
  }
  static toPersistence(deliveredNews: DeliveredNews) {
    return {
      link: deliveredNews.link,
      topic: deliveredNews.topic,
      userId: deliveredNews.userId,
    };
  }
}
