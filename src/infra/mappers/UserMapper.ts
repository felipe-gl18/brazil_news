import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO.js";
import { User } from "../../domain/entities/User.js";
import { Email } from "../../domain/valueObjects/Email.js";
import { TelegramChatId } from "../../domain/valueObjects/TelegramChatId.js";
import { NotificationChannel } from "../../domain/enums/NotificationChannel.js";

export class UserMapper {
  static toDomain(raw: any, decryptedTelegramChatId?: string) {
    return new User(
      {
        email: raw.email ? new Email(raw.email) : undefined,
        name: raw.name,
        topics: raw.topics,
        telegramChatId: decryptedTelegramChatId
          ? new TelegramChatId(decryptedTelegramChatId)
          : undefined,
        notificationChannel: raw.notificationChannel as NotificationChannel,
        deliveryTime: raw.deliveryTime,
        nextDeliveryAt: raw.nextDeliveryAt,
        timezone: raw.timezone,
        language: raw.language,
      },
      raw.id,
    );
  }
  static toPersistence(user: User, encrypted?: EncrytedPayload) {
    return {
      name: user.name,
      email: user.email?.valueOf,
      topics: user.topics,
      telegramChatCiphertext: encrypted?.ciphertext,
      telegramChatIv: encrypted?.iv,
      telegramChatAuthTag: encrypted?.authTag,
      notificationChannel: user.notificationChannel,
      deliveryTime: user.deliveryTime,
      timezone: user.timezone,
      nextDeliveryAt: user.nextDeliveryAt,
      language: user.language,
    };
  }
}
