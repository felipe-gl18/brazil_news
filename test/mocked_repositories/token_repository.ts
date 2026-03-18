import { Language, User } from "../../src/domain/entities/User.js";
import { ITokenRepository } from "../../src/domain/repositories/ITokenRepository.js";
import { Email } from "../../src/domain/valueObjects/Email.js";
const user = {
  email: new Email("johndoe@gmail.com"),
  name: "John Doe",
  topics: ["fitness"],
  deliveryTime: new Date(),
  timezone: "south-america",
  nextDeliveryAt: new Date(),
  language: "pt" as Language,
};
const tokenRepository: ITokenRepository = {
  async save(token, userId, expiresAt) {},
  async deleteToken(userId) {},
  async findByToken(token) {
    return new User(user);
  },
};

export { user, tokenRepository };
