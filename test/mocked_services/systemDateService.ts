import { IDateService } from "../../src/application/interfaces/IDateService";

const systemDateService: IDateService = {
  now() {
    return new Date();
  },
  parseTimeString(timeString: string): Date {
    return new Date(timeString);
  },
  parseDateToString(date, timezone) {
    return "10:10";
  },
};
export { systemDateService };
