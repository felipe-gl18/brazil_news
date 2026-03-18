import { ITranslationService } from "../../application/services/ITranslationService";

export class LibretranslateTranslationService implements ITranslationService {
  async translate(
    text: string,
    targetLanguage: string,
    sourceLanguage: string = "auto",
  ): Promise<string> {
    const response = await fetch(
      `${process.env["LIBRETRANSLATE_API"]!}/translate`,
      {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          api_key: "",
        }),
        headers: { "Content-Type": "application/json" },
      },
    );
    const { translatedText } = (await response.json()) as {
      translatedText: string;
    };
    return translatedText;
  }
}
