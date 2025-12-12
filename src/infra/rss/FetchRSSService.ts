import { IFetchRSSService } from "../../application/services/IFetchRSSService";
import { News } from "../../domain/entities/News";

export class FetchRSSService implements IFetchRSSService {
  async fetchLatestNews(topics: string[]): Promise<News[]> {}
}
