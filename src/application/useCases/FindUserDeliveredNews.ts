import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class FindUserDeliveredNews {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository
  ) {}
  async execute(id: string) {
    // validate if user exists
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) throw new Error("User not found!");

    // error handling
    try {
      return await this.deliveredNewsRepository.findByUser(id);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
