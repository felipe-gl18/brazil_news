import { INotificationService } from "../../src/application/services/INotificationService";
import { INotificationServiceRegistry } from "../../src/application/services/INotificationServiceRegistry";
const notificationServiceRegistry: INotificationServiceRegistry = {
  resolve(channel): INotificationService {
    return { async notify(payload: {}) {} };
  },
};
export { notificationServiceRegistry };
