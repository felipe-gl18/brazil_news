import { TZDate } from "@date-fns/tz";
import { IDateService } from "../../application/services/IDateService";

export class SystemDateService implements IDateService {
  now() {
    return new Date();
  }
  parseTimeString(timeString: string, timezone: string): Date {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new TZDate(new Date(), timezone);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
