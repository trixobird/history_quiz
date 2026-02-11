"use client"

import { Flame } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-context"

export function StreakIndicator({
  current,
  longest,
}: {
  current: number
  longest: number
}) {
  const { dict } = useLocale()

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1 ${
          current > 0 ? "text-orange-500" : "text-muted-foreground"
        }`}
      >
        <Flame className={`h-5 w-5 ${current > 0 ? "fill-orange-500" : ""}`} />
        <span className="text-xl font-bold">{current}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        {dict.streakCurrent} &middot; {longest} {dict.streakBest}
      </span>
    </div>
  )
}
