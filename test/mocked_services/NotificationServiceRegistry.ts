import { INotificationService } from "../../src/application/interfaces/INotificationService";
import { INotificationServiceRegistry } from "../../src/application/interfaces/INotificationServiceRegistry";
const notificationServiceRegistry: INotificationServiceRegistry = {
  resolve(channel): INotificationService {
    return { async notify(payload: {}) {} };
  },
};
export { notificationServiceRegistry };
