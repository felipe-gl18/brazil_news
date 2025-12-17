export class LinkAlreadyInUseError extends Error {
  constructor(link: string) {
    super(`Link already in use: ${link}`);
    this.name = "LinkAlreadyInUse";
  }
}
