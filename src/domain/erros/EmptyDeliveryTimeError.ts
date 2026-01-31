import { DomainError } from "./DomainError.js";
export class EmptyDeliveryTimeError extends DomainError {
  field = "deliveryTime";
  constructor() {
    super("Delivery time cannot be empty");
    this.name = "EmptyDeliveryTimeError";
  }
}
