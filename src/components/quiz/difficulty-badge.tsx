import { Difficulty } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from "@/lib/constants"

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <Badge className={`${DIFFICULTY_COLORS[difficulty]} border-0`}>
      {DIFFICULTY_LABELS[difficulty]}
    </Badge>
  )
}
