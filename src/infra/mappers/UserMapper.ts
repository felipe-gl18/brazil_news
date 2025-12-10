import { User } from "../../domain/entities/User.js";

export class UserMapper {
  static toDomain(raw: any) {
    return new User({
      email: raw.email,
      name: raw.name,
      topics: raw.topics,
      whatsapp: raw.whatsapp,
    });
  }
  static toPersistence(user: User) {
    return {
      name: user.name,
      email: user.email.valueOf,
      topics: user.topics,
      whatsapp: user.whatsapp?.valueOf,
    };
  }
}
