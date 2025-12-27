import { User } from "../../src/domain/entities/User.js";
import { IUserRepository } from "../../src/domain/repositories/IUserRepository.js";
import { Email } from "../../src/domain/valueObjects/Email.js";
const user = {
  email: new Email("johndoe@gmail.com"),
  name: "John Doe",
  topics: ["fitness"],
  deliveryTime: new Date(),
  timezone: "south-america",
  nextDeliveryAt: new Date(),
};
const userRepository: IUserRepository = {
  async findUsersToNotify(now) {
    return null;
  },
  async create(user) {},
  async findAll() {
    return null;
  },
  async deleteById(id) {},
  async findByEmail(email) {
    return new User(user);
  },
  async findById(id) {
    return new User(user);
  },
  async save(user) {},
};

export { user, userRepository };
