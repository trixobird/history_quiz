import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DifficultyBadge } from "./difficulty-badge"
import { CheckCircle2, XCircle } from "lucide-react"
import { Difficulty } from "@prisma/client"

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

interface Answer {
  isCorrect: boolean
  pointsEarned: number
  selectedOptions: { id: string }[]
  question: {
    text: string
    explanation: string | null
    difficulty: Difficulty
    options: Option[]
  }
}

interface ResultsSummaryProps {
  score: number
  maxScore: number
  percentage: number
  answers: Answer[]
}

export function ResultsSummary({
  score,
  maxScore,
  percentage,
  answers,
}: ResultsSummaryProps) {
  const correctCount = answers.filter((a) => a.isCorrect).length

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl">
            {percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good effort!" : "Keep learning!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {Math.round(percentage)}%
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <div>
              <span className="font-semibold">{score}</span>
              <span className="text-muted-foreground"> / {maxScore} points</span>
            </div>
            <div>
              <span className="font-semibold">{correctCount}</span>
              <span className="text-muted-foreground"> / {answers.length} correct</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Question Breakdown</h3>
        {answers.map((answer, i) => {
          const selectedIds = new Set(answer.selectedOptions.map((o) => o.id))
          return (
            <Card
              key={i}
              className={`border-l-4 ${
                answer.isCorrect ? "border-l-green-500" : "border-l-red-500"
              }`}
            >
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    {answer.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <p className="font-medium">{answer.question.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <DifficultyBadge difficulty={answer.question.difficulty} />
                    <Badge variant="outline">+{answer.pointsEarned}</Badge>
                  </div>
                </div>

                <div className="grid gap-1.5 pl-7">
                  {answer.question.options.map((option) => {
                    const wasSelected = selectedIds.has(option.id)
                    const isCorrect = option.isCorrect
                    let className = "text-sm px-3 py-1.5 rounded "

                    if (isCorrect) {
                      className += "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                    } else if (wasSelected && !isCorrect) {
                      className += "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
                    } else {
                      className += "text-muted-foreground"
                    }

                    return (
                      <div key={option.id} className={className}>
                        {wasSelected ? "→ " : "  "}
                        {option.text}
                        {isCorrect && " ✓"}
                      </div>
                    )
                  })}
                </div>

                {answer.question.explanation && (
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3 ml-7">
                    {answer.question.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
