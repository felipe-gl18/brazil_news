import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Email } from "../../domain/valueObjects/Email.js";
import { IDateService } from "../services/IDateService";
export class UpdateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly dateService: IDateService,
  ) {}
  async execute(id: string, data: UpdateUserDTO) {
    const foundUser = await this.userRepository.findById(id);
    if (data.name) foundUser.setName(data.name);
    if (data.email) foundUser.setEmail(new Email(data.email));
    if (data.deliveryTime)
      foundUser.setDeliveryTime(
        this.dateService.parseTimeString(
          data.deliveryTime,
          data.timezone || foundUser.timezone,
        ),
      );
    if (data.timezone) foundUser.setTimezone(data.timezone);
    if (data.topics) foundUser.setTopics(data.topics);
    await this.userRepository.save(foundUser);
  }
}
