import { EncrytedPayload } from "../../application/dtos/CryptoServiceDTO";
import { ICryptoService } from "../../application/services/ICryptoService";
import crypto from "node:crypto";

export class NodeCryptoService implements ICryptoService {
  private readonly algorithm = "aes-256-gcm";
  private readonly key: Buffer;

  constructor() {
    this.key = Buffer.from(process.env.CRYPTO_SECRET_KEY!, "hex");
  }

  encrypt(value: string): EncrytedPayload {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(value, "utf-8"),
      cipher.final(),
    ]);

    return {
      ciphertext: encrypted.toString("hex"),
      iv: iv.toString("hex"),
      authTag: cipher.getAuthTag().toString("hex"),
    };
  }
  decrypt(payload: EncrytedPayload): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(payload.iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(payload.authTag, "hex"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, "hex")),
      decipher.final(),
    ]);
    return decrypted.toString("utf-8");
  }
}
