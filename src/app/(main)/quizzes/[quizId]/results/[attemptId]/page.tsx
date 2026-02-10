import { getAttemptResults } from "@/actions/quiz"
import { notFound } from "next/navigation"
import { ResultsSummary } from "@/components/quiz/results-summary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, RotateCcw } from "lucide-react"

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ quizId: string; attemptId: string }>
}) {
  const { quizId, attemptId } = await params

  let attempt
  try {
    attempt = await getAttemptResults(attemptId)
  } catch {
    notFound()
  }
  if (!attempt) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to quizzes
        </Link>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/quizzes/${quizId}/play`}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Retake Quiz
          </Link>
        </Button>
      </div>

      <h1 className="text-2xl font-bold">{attempt.quiz.title} — Results</h1>

      <ResultsSummary
        score={attempt.score}
        maxScore={attempt.maxScore}
        percentage={attempt.percentage}
        answers={attempt.answers}
      />
    </div>
  )
}
