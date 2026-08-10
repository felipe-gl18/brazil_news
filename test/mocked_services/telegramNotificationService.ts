import { IAudioNotificationService } from "../../src/application/services/IAudioNotificationService";
import { INotificationService } from "../../src/application/services/INotificationService";

const telegramNotificationService: INotificationService &
  IAudioNotificationService = {
  async notify() {},
  async sendAudio() {},
};
export { telegramNotificationService };
