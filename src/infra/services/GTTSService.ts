import GTTS from "gtts";
import { ITextToSpeechService } from "../../application/services/ITextToSpeechService";

export class GTTSService implements ITextToSpeechService {
  async textToSpeech(
    text: string,
    language: string = "pt-br",
  ): Promise<Buffer> {
    if (!text.trim()) {
      throw new Error("Text cannot be empty");
    }

    const gtts = new GTTS(text, language);

    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];

      gtts
        .stream()
        .on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(chunks));
        })
        .on("error", reject);
    });
  }
}
