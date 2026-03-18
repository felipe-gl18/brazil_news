import { DomainError } from "./DomainError.js";
export class emptyLanguageError extends DomainError {
  field = "language";
  constructor() {
    super("Language cannot be empty");
    this.name = "EmptyLanguageError";
  }
}
