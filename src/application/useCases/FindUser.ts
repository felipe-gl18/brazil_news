import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class FindUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    // validating if the user exist
    const foundUser = await this.userRepository.findByEmail(email);
    if (!foundUser) throw new Error("User not found");

    // error handling
    try {
      return foundUser;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
