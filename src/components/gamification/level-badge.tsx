import { Badge } from "@/components/ui/badge"
import { LEVEL_THRESHOLDS } from "@/lib/gamification"

export function LevelBadge({ level }: { level: number }) {
  const threshold = LEVEL_THRESHOLDS.find((t) => t.level === level)
  const title = threshold?.title || "History Novice"

  return (
    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-3 py-1">
      Lv.{level} — {title}
    </Badge>
  )
}
