import { Queue } from "bullmq";
import { IQueueService } from "../../application/services/IQueueService";

export class BullMQQueueService implements IQueueService {
  private readonly connection: { host: string; port: number };
  private readonly queue: Queue;
  constructor() {
    this.connection = { host: "127.0.0.1", port: 6379 };
    this.queue = new Queue("notifications", { connection: this.connection });
  }
  async addJob(userId: string): Promise<void> {
    console.log(userId);
    try {
      await this.queue.add(
        "notify-user",
        {
          version: 1,
          userId,
        },
        {
          jobId: `notify-user-${userId}`,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
