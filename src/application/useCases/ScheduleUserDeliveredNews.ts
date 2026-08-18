import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IDateService } from "../interfaces/IDateService";
import { IQueueService } from "../interfaces/IQueueService";
import { IScheduler } from "../interfaces/IScheduler";
import { CalculateNextDeliveryAt } from "./CalculateNextDeliveryAt";

export class ScheduleUserDeliveredNews {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly scheduler: IScheduler,
    private readonly queueService: IQueueService,
    private readonly dateService: IDateService,
    private readonly calculateNextDeliveryAt: CalculateNextDeliveryAt,
  ) {}
  async execute(): Promise<void> {
    this.scheduler.schedule("*/1 * * * *", async () => {
      const users = await this.userRepository.findUsersToNotify(
        this.dateService.now(),
      );
      if (!users) return;
      for (const user of users) {
        await this.queueService.addJob(user.id!);
        const nextDeliveryAt = this.calculateNextDeliveryAt.execute(
          this.dateService.now(),
          user.deliveryTime,
          user.timezone,
        );
        user.setNextDeliveryAt(nextDeliveryAt);
        await this.userRepository.save(user);
      }
    });
  }
}
