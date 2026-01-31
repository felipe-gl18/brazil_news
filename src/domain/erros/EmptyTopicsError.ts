import { DomainError } from "./DomainError.js";
export class EmptyTopicsError extends DomainError {
  field = "topics";
  constructor() {
    super("Topics cannot be empty");
    this.name = "EmptyTopicsError";
  }
}
