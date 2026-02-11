"use client"

import { createContext, useContext } from "react"
import type { Locale, Dictionary } from "./dictionaries"
import { getDictionary } from "./dictionaries"

interface LocaleContextValue {
  locale: Locale
  dict: Dictionary
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  dict: getDictionary("en"),
})

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const dict = getDictionary(locale)
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
