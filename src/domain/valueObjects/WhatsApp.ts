export class WhatsApp {
  constructor(private readonly number: string) {
    if (!/^\+\d{1,3}\d{8,14}$/.test(number)) {
      throw new Error("Invalid WhatsApp number format");
    }
  }

  get valueOf() {
    return this.number;
  }
}
