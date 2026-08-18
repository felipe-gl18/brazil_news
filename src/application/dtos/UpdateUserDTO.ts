import { Language } from "../../domain/entities/User";

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  topics?: string[];
  timezone?: string;
  deliveryTime?: string;
  language?: Language;
}
