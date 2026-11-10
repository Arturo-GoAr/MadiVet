"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, dictionaries, isLocale, LOCALE_COOKIE, type Locale } from "./config";

const I18nContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: defaultLocale,
  setLocale: () => {},
});

// Export estático: el idioma vive en la cookie `locale` y se lee en el cliente.
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const v = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=(\\w+)`))?.[1];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- la cookie solo existe en el cliente
    if (isLocale(v)) setState(v);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000`;
    setState(l);
  };

  return <I18nContext value={{ locale, setLocale }}>{children}</I18nContext>;
}

export const useLocale = () => useContext(I18nContext).locale;
export const useSetLocale = () => useContext(I18nContext).setLocale;
export const useT = () => dictionaries[useLocale()];
