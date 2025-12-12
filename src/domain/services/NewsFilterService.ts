import { News } from "../entities/News.js";
import { User } from "../entities/User.js";

export class NewsFilterService {
  static matchUserInterests(user: User, news: News): boolean {
    return user.topics.some((userTopic) => news.topic.includes(userTopic)); // better then .map because it doesnt return an array, just a boolean value
  }
}
