import { INewsRepository } from "../../domain/repositories/INewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class FetchUserNews {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly newsRepository: INewsRepository
  ) {}
  async execute(email: string) {
    // validate if user exists
    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser) throw new Error("User not found!");

    // error handling
    try {
      return await this.newsRepository.findNews(foundUser.topics);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
