import { ICryptoService } from "../../src/application/services/ICryptoService";

const cryptoService: ICryptoService = {
  encrypt() {
    return {
      authTag: "",
      ciphertext: "",
      iv: "",
    };
  },
  decrypt() {
    return "";
  },
};

export { cryptoService };
