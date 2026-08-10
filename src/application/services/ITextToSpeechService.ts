export interface ITextToSpeechService {
  textToSpeech(text: string): Promise<Buffer>;
}
