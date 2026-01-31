export abstract class ApplicationError extends Error {
  abstract statusCode: number;
  field?: string;
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = `UserApplicationError`;
  }
}
