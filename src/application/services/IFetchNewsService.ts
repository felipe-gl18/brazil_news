import { FetchNewsDTO } from "../dtos/FetchNewsDTO.js";
export interface IFetchNewsService {
  fetchLatestNews(topics: string[]): Promise<FetchNewsDTO[]>;
}
