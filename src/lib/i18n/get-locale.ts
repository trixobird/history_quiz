import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { Locale } from "./dictionaries"

export async function getLocale(): Promise<Locale> {
  // 1. Check authenticated user's preference
  try {
    const session = await auth()
    if (session?.user?.id) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { locale: true },
      })
      if (user?.locale && (user.locale === "en" || user.locale === "el")) {
        return user.locale
      }
    }
  } catch {
    // Not authenticated or DB error — fall through
  }

  // 2. Check Accept-Language header
  try {
    const headersList = await headers()
    const acceptLang = headersList.get("accept-language") ?? ""
    if (acceptLang.match(/\bel\b/)) {
      return "el"
    }
  } catch {
    // Headers not available
  }

  // 3. Default
  return "en"
}
