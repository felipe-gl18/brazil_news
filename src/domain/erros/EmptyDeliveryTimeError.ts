import { DomainError } from "./DomainError.js";
export class EmptyDeliveryTimeError extends DomainError {
  constructor() {
    super("Delivery time cannot be empty");
    this.name = "EmptyDeliveryTimeError";
  }
}
