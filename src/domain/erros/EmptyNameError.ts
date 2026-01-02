import { DomainError } from "./DomainError.js";
export class EmptyNameError extends DomainError {
  constructor() {
    super("Name cannot be empty");
    this.name = "EmptyNameError";
  }
}
