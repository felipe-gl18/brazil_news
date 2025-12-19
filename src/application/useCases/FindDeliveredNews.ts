import { IDeliveredNewsRepository } from "../../domain/repositories/IDeliveredNewsRepository";
export class FindDeliveredNews {
  constructor(
    private readonly deliveredNewsRepository: IDeliveredNewsRepository
  ) {}
  async execute() {
    return await this.deliveredNewsRepository.findAll();
  }
}
