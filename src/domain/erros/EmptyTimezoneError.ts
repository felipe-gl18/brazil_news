import { DomainError } from "./DomainError.js";
export class EmptyTimezoneError extends DomainError {
  constructor() {
    super("Timezone cannot be empty");
    this.name = "EmptyTimezoneError";
  }
}
