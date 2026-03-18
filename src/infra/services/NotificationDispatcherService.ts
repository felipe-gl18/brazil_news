import { NotificationPayloadDTO } from "../../application/dtos/NotificationDTO";
import { INotificationService } from "../../application/services/INotificationService";

export class NotiticationDispatcherService implements INotificationService {
  constructor(private readonly services: INotificationService[]) {}
  async notify(payload: NotificationPayloadDTO) {
    await Promise.all(this.services.map((service) => service.notify(payload)));
  }
}
