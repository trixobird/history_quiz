"use client"

import { Progress } from "@/components/ui/progress"
import { useLocale } from "@/lib/i18n/locale-context"
import { t } from "@/lib/i18n/dictionaries"

interface QuizProgressBarProps {
  current: number
  total: number
}

export function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const percentage = ((current + 1) / total) * 100
  const { dict } = useLocale()

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {t(dict.questionOf, { current: current + 1, total })}
        </span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}
