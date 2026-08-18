import { NotificationChannel } from "../../domain/enums/NotificationChannel";
import { INotificationService } from "../../application/interfaces/INotificationService";
import { INotificationServiceRegistry } from "../../application/interfaces/INotificationServiceRegistry";

export class NotificationServiceRegistry implements INotificationServiceRegistry {
  private readonly services: Map<NotificationChannel, INotificationService>;

  constructor(
    services: Partial<Record<NotificationChannel, INotificationService>>,
  ) {
    this.services = new Map(
      Object.entries(services) as [NotificationChannel, INotificationService][],
    );
  }

  resolve(channel: NotificationChannel): INotificationService {
    const service = this.services.get(channel);
    if (!service) {
      throw new Error(
        `No notification service registered for channel: ${channel}`,
      );
    }
    return service;
  }
}
