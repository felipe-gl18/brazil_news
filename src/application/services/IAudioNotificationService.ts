export interface IAudioNotificationService {
  sendAudio(recipient: string, audio: Buffer, caption?: string): Promise<void>;
}
