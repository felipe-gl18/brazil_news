export class EmptyEmailError extends Error {
  constructor() {
    super("Email cannot be empty");
    this.name = "EmptyEmailError";
  }
}
