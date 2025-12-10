import { News } from "../entities/News.js";
export interface INewsRepository {
  findNews(topics: string[]): Promise<News[] | null>;
}
