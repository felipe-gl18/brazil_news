import { IDateService } from "../../application/services/IDateService";

export class SystemDateService implements IDateService {
  now() {
    return new Date();
  }
}
