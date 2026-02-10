import { getAttemptResults } from "@/actions/quiz"
import { notFound } from "next/navigation"
import { ResultsSummary } from "@/components/quiz/results-summary"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params

  let attempt
  try {
    attempt = await getAttemptResults(attemptId)
  } catch {
    notFound()
  }
  if (!attempt) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/history"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to history
      </Link>

      <div>
        <h1 className="text-2xl font-bold">{attempt.quiz.title}</h1>
        <p className="text-sm text-muted-foreground">
          Completed{" "}
          {attempt.completedAt
            ? new Date(attempt.completedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "In progress"}
        </p>
      </div>

      <ResultsSummary
        score={attempt.score}
        maxScore={attempt.maxScore}
        percentage={attempt.percentage}
        answers={attempt.answers}
      />
    </div>
  )
}
