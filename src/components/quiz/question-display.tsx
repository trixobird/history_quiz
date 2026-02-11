"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DifficultyBadge } from "./difficulty-badge"
import { Difficulty } from "@prisma/client"
import { useLocale } from "@/lib/i18n/locale-context"

interface Option {
  id: string
  text: string
  orderIndex: number
}

interface QuestionDisplayProps {
  question: {
    id: string
    text: string
    difficulty: Difficulty
    multipleCorrect: boolean
    options: Option[]
  }
  onSubmit: (selectedOptionIds: string[]) => void
  isSubmitting: boolean
}

export function QuestionDisplay({
  question,
  onSubmit,
  isSubmitting,
}: QuestionDisplayProps) {
  const [selected, setSelected] = useState<string[]>([])
  const { dict } = useLocale()

  function toggleOption(optionId: string) {
    if (question.multipleCorrect) {
      setSelected((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      )
    } else {
      setSelected([optionId])
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <DifficultyBadge difficulty={question.difficulty} />
          {question.multipleCorrect && (
            <span className="text-xs text-muted-foreground">
              {dict.selectAllThatApply}
            </span>
          )}
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={isSubmitting}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5 ${
                isSelected
                  ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                  : "border-border"
              }`}
            >
              {question.multipleCorrect ? (
                <Checkbox
                  checked={isSelected}
                  className="pointer-events-none"
                  aria-hidden
                />
              ) : (
                <div
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "border-primary" : "border-muted-foreground/50"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              )}
              <span className="text-sm">{option.text}</span>
            </button>
          )
        })}

        <Button
          onClick={() => onSubmit(selected)}
          disabled={selected.length === 0 || isSubmitting}
          className="w-full mt-4"
          size="lg"
        >
          {isSubmitting ? dict.submitting : dict.submitAnswer}
        </Button>
      </CardContent>
    </Card>
  )
}
