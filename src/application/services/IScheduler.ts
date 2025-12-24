export interface IScheduler {
  schedule(expression: string, task: () => Promise<void>): void;
}
