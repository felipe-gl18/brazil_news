export class EmptyNameError extends Error {
  constructor() {
    super("Name cannot be empty");
    this.name = "EmptyNameError";
  }
}
