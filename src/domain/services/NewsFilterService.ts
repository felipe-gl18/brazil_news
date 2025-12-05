import { News } from "../entities/News";
import { User } from "../entities/User";

export class NewsFilterService {
  static matchUserInterests(user: User, news: News): boolean {
    return news.topics.some((topic) => user.topics.includes(topic)); // better then .map because it doesnt return an array, just a boolean value
  }
}
