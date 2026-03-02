import { User } from "../../src/domain/entities/User.js";
import { ITokenRepository } from "../../src/domain/repositories/ITokenRepository.js";
import { Email } from "../../src/domain/valueObjects/Email.js";
const user = {
  email: new Email("johndoe@gmail.com"),
  name: "John Doe",
  topics: ["fitness"],
  deliveryTime: new Date(),
  timezone: "south-america",
  nextDeliveryAt: new Date(),
};
const tokenRepository: ITokenRepository = {
  async save(token, userId, expiresAt) {},
  async deleteByToken(token) {},
  async findByToken(token) {
    return {
      name: user.name,
      email: user.email.valueOf,
      deliveryTime: user.deliveryTime,
      timezone: user.timezone,
      topics: user.topics,
    };
  },
};

export { user, tokenRepository };
