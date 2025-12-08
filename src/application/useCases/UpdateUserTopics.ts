import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class UpdateUserTopcis {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, topics: string[]) {
    //validating if the user exists
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) throw new Error("User not found");

    // error handling
    try {
      // upating user interest topics
      await this.userRepository.updateUserTopics(id, topics);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
