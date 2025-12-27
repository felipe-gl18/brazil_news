import { IDeliveredNewsRepository } from "../../src/domain/repositories/IDeliveredNewsRepository";

const deliveredNewsRepository: IDeliveredNewsRepository = {
  async findAll() {
    return null;
  },
  async findByUser(userId) {
    return null;
  },
  async save() {},
  async deleteByUser(userId) {},
  async saveMany() {},
};

export { deliveredNewsRepository };
