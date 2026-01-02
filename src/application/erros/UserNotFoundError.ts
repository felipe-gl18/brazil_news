import { ApplicationError } from "./ApplicationError.js";
export class UserNotFoundError extends ApplicationError {
  statusCode = 404;
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}
