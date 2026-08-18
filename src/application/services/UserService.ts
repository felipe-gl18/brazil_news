import { User } from "../../domain/entities/User.js";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { TelegramChatId } from "../../domain/valueObjects/TelegramChatId.js";
import { ICryptoService } from "../interfaces/ICryptoService";
import { IDateService } from "../interfaces/IDateService";
import { CalculateNextDeliveryAt } from "../useCases/CalculateNextDeliveryAt.js";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
import { IUserService } from "../interfaces/IUserService";

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService,
    private readonly tokenRepository: ITokenRepository,
    private readonly deliveredNewsRepository: IDeliveredNewsRepository,
    private readonly dateService: IDateService,
    private readonly calculateNextDeliveryAt: CalculateNextDeliveryAt,
  ) {}

  async findUser(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async findUserByToken(token: string) {
    return await this.tokenRepository.findByToken(token);
  }

  async findUserDeliveredNews(userId: string) {
    return await this.deliveredNewsRepository.findByUser(userId);
  }

  async create(data: CreateUserDTO) {
    const email = data.email ? new Email(data.email) : undefined;

    const telegramChatId = data.telegramChatId
      ? new TelegramChatId(data.telegramChatId)
      : undefined;

    const encryptedTelegramChatId = telegramChatId
      ? this.cryptoService.encrypt(telegramChatId.value)
      : undefined;

    const deliveryTime = this.dateService.parseTimeString(
      data.deliveryTime,
      data.timezone,
    );

    const user = new User({
      name: data.name,
      email,
      telegramChatId,
      notificationChannel: data.notificationChannel,
      topics: data.topics,
      deliveryTime,
      timezone: data.timezone,
      language: data.language,
      nextDeliveryAt: this.calculateNextDeliveryAt.execute(
        this.dateService.now(),
        deliveryTime,
        data.timezone,
      ),
    });

    await this.userRepository.create(user, encryptedTelegramChatId);
  }

  async update(token: string, data: UpdateUserDTO) {
    const foundUser = await this.tokenRepository.findByToken(token);
    if (data.name) foundUser!.setName(data.name);
    if (data.email) foundUser!.setEmail(new Email(data.email));
    if (data.deliveryTime)
      foundUser!.setDeliveryTime(
        this.dateService.parseTimeString(
          data.deliveryTime,
          data.timezone || foundUser!.timezone,
        ),
      );
    if (data.timezone) foundUser!.setTimezone(data.timezone);
    if (data.topics) foundUser!.setTopics(data.topics);
    const deliveryTime = this.dateService.parseTimeString(
      data.deliveryTime!,
      data.timezone!,
    );
    foundUser?.setNextDeliveryAt(
      this.calculateNextDeliveryAt.execute(
        this.dateService.now(),
        deliveryTime,
        data.timezone!,
      ),
    );
    await this.userRepository.save(foundUser!);
    await this.tokenRepository.deleteToken(token);
  }

  async delete(userId: string) {
    await this.userRepository.deleteById(userId);
  }
}
