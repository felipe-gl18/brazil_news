import { IDateService } from "../../src/application/services/IDateService";

const systemDateService: IDateService = {
  now() {
    return new Date();
  },
  parseTimeString(timeString: string): Date {
    return new Date(timeString);
  },
};
export { systemDateService };
