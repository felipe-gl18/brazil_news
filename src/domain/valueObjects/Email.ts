export class Email {
  constructor(private readonly email: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  get valueOf() {
    return this.email;
  }
}
