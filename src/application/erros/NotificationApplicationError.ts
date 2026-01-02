import { ApplicationError } from "./ApplicationError.js";
export class NotificationApplicationError extends ApplicationError {
  statusCode = 500;
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = "NotificationApplicationError";
  }
}
