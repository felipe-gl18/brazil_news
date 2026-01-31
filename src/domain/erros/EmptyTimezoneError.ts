import { DomainError } from "./DomainError.js";
export class EmptyTimezoneError extends DomainError {
  field = "timezone";
  constructor() {
    super("Timezone cannot be empty");
    this.name = "EmptyTimezoneError";
  }
}
