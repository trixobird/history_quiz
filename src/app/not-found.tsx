import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function NotFound() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">🗺️</div>
        <h1 className="text-4xl font-bold">{dict.notFoundTitle}</h1>
        <p className="text-muted-foreground">
          {dict.notFoundText}
        </p>
        <Button asChild>
          <Link href="/">{dict.goHome}</Link>
        </Button>
      </div>
    </div>
  )
}
