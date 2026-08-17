export class EmptyNotificationChannelError extends Error {
  readonly field = "notificationChannel";
  constructor(message: string = "Notification channel must be provided") {
    super(message);
    this.name = "EmptyNotificationChannelError";
    Object.setPrototypeOf(this, EmptyNotificationChannelError.prototype);
  }
}
