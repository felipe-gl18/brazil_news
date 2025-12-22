import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IQueueService } from "../services/IQueueService";
import { IScheduler } from "../services/IScheduler";

export class ScheduleUserDeliveredNews {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly scheduler: IScheduler,
    private readonly queueService: IQueueService
  ) {}
  async execute(): Promise<void> {
    this.scheduler.schedule("*/1 * * * *", "America/Sao_Paulo", async () => {
      const now = new Date();
    });
  }
}
