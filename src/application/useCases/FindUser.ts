import { IUserRepository } from "../../domain/repositories/IUserRepository";
export class FindUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
