import { ICryptoService } from "../../src/application/interfaces/ICryptoService";

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
  generateRandomToken() {
    return "random-token";
  },
};

export { cryptoService };
