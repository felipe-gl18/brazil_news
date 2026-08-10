import { ITextToSpeechService } from "../../src/application/services/ITextToSpeechService";

const gttsService: ITextToSpeechService = {
  async textToSpeech(text) {
    return Buffer.from(`Mocked audio for text: ${text}`, "utf-8");
  },
};

export { gttsService };
