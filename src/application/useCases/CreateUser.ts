import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { WhatsApp } from "../../domain/valueObjects/WhatsApp.js";
import { CreateUserDTO } from "./CreateUserDTO";
export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(data: CreateUserDTO) {
    const email = new Email(data.email);
    const whatsapp = data.whatsapp ? new WhatsApp(data.whatsapp) : undefined;
    const user = new User({
      name: data.name,
      email,
      whatsapp,
      topics: data.topics,
    });
    await this.userRepository.create(user);
  }
}
