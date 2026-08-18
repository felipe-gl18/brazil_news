export interface IQueueService {
  addJob(userId: string): Promise<void>;
}
