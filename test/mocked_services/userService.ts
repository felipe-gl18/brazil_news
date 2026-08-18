import { Language } from "../../generated/prisma/enums";
import { IUserService } from "../../src/application/interfaces/IUserService";
import { DeliveredNews } from "../../src/domain/entities/DeliveredNews";
import { User } from "../../src/domain/entities/User";
import { NotificationChannel } from "../../src/domain/enums/NotificationChannel";
import { Email } from "../../src/domain/valueObjects/Email";

const user = {
  name: "John Doe",
  email: new Email("johndoe@gmail.com"),
  topics: ["fitness"],
  deliveryTime: new Date("2025-12-21T18:30:00.000Z"),
  nextDeliveryAt: new Date("2025-12-21T18:30:00.000Z"),
  timezone: "South/America",
  language: "pt" as Language,
  notificationChannel: NotificationChannel.EMAIL,
};

const userService: IUserService = {
  async create(data) {},
  async delete(userId) {},
  async findUser(email) {
    return new User(user);
  },
  async findUserByToken(email) {
    return new User(user);
  },
  async findUserDeliveredNews(userId) {
    return [
      new DeliveredNews({
        link: "link",
        topic: "fitness",
        userId: "userId",
        sentAt: new Date(),
      }),
    ];
  },
  async update(token, data) {},
};
export { userService };
