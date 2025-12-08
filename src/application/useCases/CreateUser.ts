import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email";
import { WhatsApp } from "../../domain/valueObjects/WhatsApp";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    // transforming string in Value Objects
    const email = new Email(data.email);
    const whatsapp = data.whatsapp ? new WhatsApp(data.whatsapp) : undefined;

    // validating if an user is not using the same email
    const foundUser = await this.userRepository.findByEmail(email.valueOf);
    if (foundUser) throw new Error("Email already beign used");

    // creating user entity
    // id is generated automatically by the database
    const user = new User({
      name: data.name,
      email,
      whatsapp,
      topics: data.topics,
    });

    // error handling
    try {
      // saving user in the repository
      await this.userRepository.create(user);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Something went wrong: ${error.message}`);
      throw new Error(`Something went wrong ${error}`);
    }
  }
}
