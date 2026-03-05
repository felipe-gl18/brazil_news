import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { IDateService } from "../services/IDateService";
import { CalculateNextDeliveryAt } from "./CalculateNextDeliveryAt";
export class UpdateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly calculateNextDeliveryAt: CalculateNextDeliveryAt,
    private readonly dateService: IDateService,
  ) {}
  async execute(token: string, data: UpdateUserDTO) {
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
}
