import { IAudioNotificationService } from "../../src/application/interfaces/IAudioNotificationService";
import { INotificationService } from "../../src/application/interfaces/INotificationService";

const telegramNotificationService: INotificationService &
  IAudioNotificationService = {
  async notify() {},
  async sendAudio() {},
};
export { telegramNotificationService };
