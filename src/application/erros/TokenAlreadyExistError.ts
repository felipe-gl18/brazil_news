import { ApplicationError } from "./ApplicationError.js";

export class TokenAlreadyExistError extends ApplicationError {
  statusCode = 409;
  constructor() {
    super(`Token already exist`);
    this.name = "TokenAlreadyExistError";
  }
}
