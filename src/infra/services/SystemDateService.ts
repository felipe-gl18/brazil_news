import { IDateService } from "../../application/services/IDateService";

export class SystemDateService implements IDateService {
  now() {
    return new Date();
  }
  parseTimeString(timeString: string): Date {
    return new Date(timeString);
  }
}
