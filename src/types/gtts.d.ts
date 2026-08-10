declare module "gtts" {
  interface GTTSOptions {
    lang?: string;
    slow?: boolean;
  }

  class GTTS {
    constructor(text: string, lang?: string);

    save(filename: string, callback: (error: Error | null) => void): void;

    stream(): NodeJS.ReadableStream;
  }

  export = GTTS;
}
