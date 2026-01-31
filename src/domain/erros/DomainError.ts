export abstract class DomainError extends Error {
  field?: string;
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = "DomainError";
  }
}
