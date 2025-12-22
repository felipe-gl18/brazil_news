export interface IScheduler {
  schedule(
    expression: string,
    timezone: string,
    task: () => Promise<void>
  ): void;
}
