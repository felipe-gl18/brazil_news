import { ICryptoService } from "../../src/application/services/ICryptoService";
import { ITranslationService } from "../../src/application/services/ITranslationService";

const libretranslateTranslationService: ITranslationService = {
  async translate(text, targetLanguage, sourceLanguage) {
    return "";
  },
};

export { libretranslateTranslationService };
