import { EncrytedPayload } from "../dtos/CryptoServiceDTO";
export interface ICryptoService {
  encrypt(value: string): EncrytedPayload;
  decrypt(payload: EncrytedPayload): string;
}
