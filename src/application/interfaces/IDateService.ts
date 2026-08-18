export interface IDateService {
  now(date?: string): Date;
  parseTimeString(timeString: string, timezone: string): Date;
  parseDateToString(date: Date, timezone: string): string;
}
