export class InvalidNotificationChannelError extends Error {
  readonly field = "notificationChannel";
  constructor(message: string = "Invalid notification channel") {
    super(message);
    this.name = "InvalidNotificationChannelError";
    Object.setPrototypeOf(this, InvalidNotificationChannelError.prototype);
  }
}
