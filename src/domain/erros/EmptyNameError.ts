import { DomainError } from "./DomainError.js";
export class EmptyNameError extends DomainError {
  field = "name";
  constructor() {
    super("Name cannot be empty");
    this.name = "EmptyNameError";
  }
}
