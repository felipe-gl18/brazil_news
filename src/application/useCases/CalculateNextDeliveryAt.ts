import { TZDate } from "@date-fns/tz";
export class CalculateNextDeliveryAt {
  constructor() {}
  execute(now: Date, deliveryTime: Date, timezone: string) {
    const nowTz = new TZDate(now, timezone);
    const deliveryTz = new TZDate(deliveryTime, timezone);

    // setting the nextDeliveryAt
    const next = new TZDate(nowTz, timezone);
    next.setHours(deliveryTime.getHours());
    next.setMinutes(deliveryTime.getMinutes());
    next.setSeconds(0);
    next.setMilliseconds(0);

    // if the nexDeliveryAt has already passed, schedule it tomorrow
    if (next <= nowTz) next.setDate(next.getDate() + 1);

    return next;
  }
}
