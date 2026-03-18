import { Language } from "../domain/entities/User";

export const languages: Record<
  Language,
  {
    value: string;
    dateFormat: Intl.DateTimeFormatOptions;
  }
> = {
  pt: {
    value: "pt-BR",
    dateFormat: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
  en: {
    value: "en-US",
    dateFormat: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
  es: {
    value: "es-ES",
    dateFormat: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
  fr: {
    value: "fr-FR",
    dateFormat: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
  de: {
    value: "de-DE",
    dateFormat: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  },
} as const;
