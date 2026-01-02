import { DomainError } from "./DomainError.js";
export class EmptyTopicsError extends DomainError {
  constructor() {
    super("Topics cannot be empty");
    this.name = "EmptyTopicsError";
  }
}
