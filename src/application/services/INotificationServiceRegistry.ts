import { NotificationChannel } from "../../domain/enums/NotificationChannel";
import { INotificationService } from "./INotificationService";

export interface INotificationServiceRegistry {
  resolve(channel: NotificationChannel): INotificationService;
}
