import "server-only";
import { cookies } from "next/headers";
import { defaultLocale, dictionaries, isLocale, LOCALE_COOKIE } from "./config";

export async function getLocale() {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()];
}
