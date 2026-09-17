import { en, type MessageKey } from "./en";
import { es } from "./es";

export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export const dictionaries = { en, es } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? en;
}

export function translate(locale: Locale, key: MessageKey) {
  return getDictionary(locale)[key] ?? en[key];
}

export type { MessageKey };
export { en, es };
