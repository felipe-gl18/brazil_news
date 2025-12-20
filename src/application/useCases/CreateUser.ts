import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { TelegramChatId } from "../../domain/valueObjects/TelegramChatId.js";
import { ICryptoService } from "../services/ICryptoService.js";
import { CreateUserDTO } from "./CreateUserDTO";
export class CreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService
  ) {}
  async execute(data: CreateUserDTO) {
    const email = new Email(data.email);

    const telegramChatId = data.telegramChatId
      ? new TelegramChatId(data.telegramChatId)
      : undefined;

    const encryptedTelegramChatId = telegramChatId
      ? this.cryptoService.encrypt(telegramChatId.valueOf)
      : undefined;

    const user = new User({
      name: data.name,
      email,
      telegramChatId,
      topics: data.topics,
    });

    await this.userRepository.create(user, encryptedTelegramChatId);
  }
}
