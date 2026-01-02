export abstract class DomainError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = "DomainError";
  }
}
