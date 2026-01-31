import { DomainError } from "./DomainError.js";
export class EmptyEmailError extends DomainError {
  field = "email";
  constructor() {
    super("Email cannot be empty");
    this.name = "EmptyEmailError";
  }
}
