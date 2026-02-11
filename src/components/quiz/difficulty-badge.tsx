"use client"

import { Difficulty } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { DIFFICULTY_COLORS } from "@/lib/constants"
import { getDifficultyLabel } from "@/lib/i18n/dictionaries"
import { useLocale } from "@/lib/i18n/locale-context"

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { dict } = useLocale()

  return (
    <Badge className={`${DIFFICULTY_COLORS[difficulty]} border-0`}>
      {getDifficultyLabel(difficulty, dict)}
    </Badge>
  )
}
