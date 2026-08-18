import { IAudioNotificationService } from "../../application/interfaces/IAudioNotificationService";

export class AudioNotificationDispatcherService implements IAudioNotificationService {
  constructor(private readonly services: IAudioNotificationService[]) {}
  async sendAudio(
    recipient: string,
    audio: Buffer,
    caption?: string,
  ): Promise<void> {
    await Promise.all(
      this.services.map((service) =>
        service.sendAudio(recipient, audio, caption),
      ),
    );
  }
}
