import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
export class FindDeliveredNews {
  constructor(
    private readonly deliveredNewsRepository: IDeliveredNewsRepository
  ) {}
  async execute() {
    await this.deliveredNewsRepository.findAll();
  }
}
