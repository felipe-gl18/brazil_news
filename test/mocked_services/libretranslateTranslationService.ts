import { ICryptoService } from "../../src/application/interfaces/ICryptoService";
import { ITranslationService } from "../../src/application/interfaces/ITranslationService";

const libretranslateTranslationService: ITranslationService = {
  async translate(text, targetLanguage, sourceLanguage) {
    return "";
  },
};

export { libretranslateTranslationService };
