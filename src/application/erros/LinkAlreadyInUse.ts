import { ApplicationError } from "./ApplicationError.js";
export class LinkAlreadyInUseError extends ApplicationError {
  statusCode = 409;
  constructor(link: string) {
    super(`Link already in use: ${link}`);
    this.name = "LinkAlreadyInUse";
  }
}
