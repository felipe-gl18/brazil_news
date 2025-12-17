import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
export class FindUserDeliveredNews {
  constructor(
    private readonly deliveredNewsRepository: IDeliveredNewsRepository
  ) {}
  async execute(userId: string) {
    return await this.deliveredNewsRepository.findByUser(userId);
  }
}
