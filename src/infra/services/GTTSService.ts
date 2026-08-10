import GTTS from "gtts";
import { ITextToSpeechService } from "../../application/services/ITextToSpeechService";

export class GTTSService implements ITextToSpeechService {
  constructor(private readonly language: string = "pt-br") {}

  async textToSpeech(text: string): Promise<Buffer> {
    if (!text.trim()) {
      throw new Error("Text cannot be empty");
    }

    const gtts = new GTTS(text, this.language);

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
