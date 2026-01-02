export abstract class ApplicationError extends Error {
  abstract statusCode: number;
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = `UserApplicationError`;
  }
}
