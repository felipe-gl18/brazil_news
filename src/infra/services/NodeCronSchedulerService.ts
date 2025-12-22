import { IScheduler } from "../../application/services/IScheduler";
import cron from "node-cron";

export class NodeCronSchedulerService implements IScheduler {
  schedule(
    expression: string,
    timezone: string,
    task: () => Promise<void>
  ): void {
    cron.schedule(expression, task, { timezone });
  }
}
