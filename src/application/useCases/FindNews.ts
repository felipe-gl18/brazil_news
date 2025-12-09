import { INewsRepository } from "../../domain/repositories/INewsRepository";

export class FindNews {
  constructor(private readonly newsRepository: INewsRepository) {}
  async execute(topics: string[]) {
    try {
      // fetching news according to the topics array
      await this.newsRepository.findNews(topics);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
