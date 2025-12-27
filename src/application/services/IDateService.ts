export interface IDateService {
  now(date?: string): Date;
  parseTimeString(timeString: string): Date;
}
