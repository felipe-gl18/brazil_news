import { IDateService } from "../../src/application/services/IDateService";

const systemDateService: IDateService = {
  now() {
    return new Date();
  },
};
export { systemDateService };
