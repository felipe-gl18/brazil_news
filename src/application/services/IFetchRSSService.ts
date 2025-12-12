import { News } from "../../domain/entities/News";
export interface IFetchRSSService {
  fetchLatestNews(topics: string[]): Promise<News[]>;
}
