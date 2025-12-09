import { News } from "../entities/News";
export interface INewsRepository {
  findNews(topics: string[]): Promise<News[] | null>;
}
