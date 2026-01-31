import { ApplicationError } from "./ApplicationError.js";
export class EmailAlreadyInUseError extends ApplicationError {
  statusCode = 409;
  field = "email";
  constructor(email: string) {
    super(`Email already in use: ${email}`);
    this.name = "EmailAlreadyInUseError";
  }
}
