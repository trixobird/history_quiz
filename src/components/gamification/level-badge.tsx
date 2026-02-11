"use client"

import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/i18n/locale-context"
import { getLevelTitle } from "@/lib/i18n/dictionaries"

export function LevelBadge({ level }: { level: number }) {
  const { dict } = useLocale()
  const title = getLevelTitle(level, dict)

  return (
    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-3 py-1">
      Lv.{level} — {title}
    </Badge>
  )
}
