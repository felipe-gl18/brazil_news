export interface ITextToSpeechService {
  textToSpeech(text: string, language: string): Promise<Buffer>;
}
