import type { Locale } from "./dictionaries"

type Translatable = {
  translations?: Record<string, Record<string, string>> | null
  [key: string]: unknown
}

export function tr<T extends Translatable>(
  item: T,
  field: string,
  locale: Locale
): string {
  if (locale !== "en" && item.translations) {
    const localeTranslations = item.translations[locale]
    if (localeTranslations && localeTranslations[field]) {
      return localeTranslations[field]
    }
  }
  return (item as Record<string, unknown>)[field] as string
}
