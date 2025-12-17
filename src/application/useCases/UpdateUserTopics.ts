import { IUserRepository } from "../../domain/repositories/IUserRepository";
export class UpdateUserTopcis {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: string, topics: string[]) {
    await this.userRepository.updateUserTopics(id, topics);
  }
}
