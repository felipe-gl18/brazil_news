import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";

export class FindDeliveredNews {
  constructor(
    private readonly deliveredNewsRepository: IDeliveredNewsRepository
  ) {}
  async execute() {
    try {
      // fetching news according to the topics array
      await this.deliveredNewsRepository.findAll();
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
