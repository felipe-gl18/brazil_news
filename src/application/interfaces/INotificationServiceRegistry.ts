import { NotificationChannel } from "../../../generated/prisma/enums";
import { INotificationService } from "./INotificationService";

export interface INotificationServiceRegistry {
  resolve(channel: NotificationChannel): INotificationService;
}
