import { NotificationPayloadDTO } from "../dtos/NotificationDTO";
export interface INotificationService {
  notify(payload: NotificationPayloadDTO): Promise<void>;
}
