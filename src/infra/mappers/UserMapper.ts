import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO.js";
import { User } from "../../domain/entities/User.js";
import { Email } from "../../domain/valueObjects/Email.js";
import { TelegramChatId } from "../../domain/valueObjects/TelegramChatId.js";

export class UserMapper {
  static toDomain(raw: any, decryptedTelegramChatId?: string) {
    return new User(
      {
        email: new Email(raw.email),
        name: raw.name,
        topics: raw.topics,
        telegramChatId: decryptedTelegramChatId
          ? new TelegramChatId(decryptedTelegramChatId)
          : undefined,
        deliveryTime: raw.deliveryTime,
        nextDeliveryAt: raw.nextDeliveryAt,
        timezone: raw.timezone,
      },
      raw.id
    );
  }
  static toPersistence(user: User, encrypted?: EncrytedPayload) {
    return {
      name: user.name,
      email: user.email.valueOf,
      topics: user.topics,
      telegramChatCiphertext: encrypted?.ciphertext,
      telegramChatIv: encrypted?.iv,
      telegramChatAuthTag: encrypted?.authTag,
      deliveryTime: user.deliveryTime,
      timezone: user.timezone,
      nextDeliveryAt: user.nextDeliveryAt,
    };
  }
}
