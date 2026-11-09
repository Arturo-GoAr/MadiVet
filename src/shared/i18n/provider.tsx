"use client";

import { createContext, useContext, useEffect } from "react";
import { dictionaries, type Locale } from "./config";

const I18nContext = createContext<Locale>("es");

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext value={locale}>{children}</I18nContext>;
}

export const useLocale = () => useContext(I18nContext);
export const useT = () => dictionaries[useLocale()];
