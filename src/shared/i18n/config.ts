import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

export const dictionaries = { es, en };
export type Locale = keyof typeof dictionaries;
export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "locale";

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && v in dictionaries;
