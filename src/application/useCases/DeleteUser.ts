import { IUserRepository } from "../../domain/repositories/IUserRepository.js";
export class DeleteUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: string) {
    await this.userRepository.deleteById(id);
  }
}
