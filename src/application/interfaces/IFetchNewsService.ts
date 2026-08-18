import { FetchNewsDTO } from "../dtos/FetchNewsDTO";

export interface IFetchNewsService {
  fetchLatestNews(topics: string[]): Promise<FetchNewsDTO[]>;
}
