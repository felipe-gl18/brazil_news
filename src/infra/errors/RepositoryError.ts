export class RepositoryError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "RepositoryError";
    this.cause = cause;
  }
}
