export abstract class UserApplicationError extends Error {
  abstract statusCode: number;
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
    this.name = `UserApplicationError`;
  }
}
