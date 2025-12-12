export class NotificationApplicationError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = "NotificationApplicationError";
  }
}
