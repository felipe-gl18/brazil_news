export class EmptyTopicsError extends Error {
  statusCode = 400;
  constructor() {
    super("Topics cannot be empty");
    this.name = "EmptyTopicsError";
  }
}
