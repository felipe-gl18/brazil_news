import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { TelegramChatId } from "../../domain/valueObjects/TelegramChatId.js";
import { ICryptoService } from "../services/ICryptoService.js";
import { IDateService } from "../services/IDateService.js";
import { CalculateNextDeliveryAt } from "./CalculateNextDeliveryAt.js";
import { CreateUserDTO } from "./CreateUserDTO";
export class CreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly dateService: IDateService,
    private readonly calculateNextDeliveryAt: CalculateNextDeliveryAt
  ) {}
  async execute(data: CreateUserDTO) {
    const email = new Email(data.email);

    const telegramChatId = data.telegramChatId
      ? new TelegramChatId(data.telegramChatId)
      : undefined;

    const encryptedTelegramChatId = telegramChatId
      ? this.cryptoService.encrypt(telegramChatId.valueOf)
      : undefined;

    const deliveryTime = new Date(data.deliveryTime);
    const user = new User({
      name: data.name,
      email,
      telegramChatId,
      topics: data.topics,
      deliveryTime,
      timezone: data.timezone,
      nextDeliveryAt: this.calculateNextDeliveryAt.execute(
        this.dateService.now(),
        deliveryTime,
        data.timezone
      ),
    });

    await this.userRepository.create(user, encryptedTelegramChatId);
  }
}
