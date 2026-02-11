import { getAttemptResults } from "@/actions/quiz"
import { notFound } from "next/navigation"
import { ResultsSummary } from "@/components/quiz/results-summary"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string }>
}) {
  const { attemptId } = await params
  const locale = await getLocale()
  const dict = getDictionary(locale)

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
        {dict.backToHistory}
      </Link>

      <div>
        <h1 className="text-2xl font-bold">{attempt.quiz.title}</h1>
        <p className="text-sm text-muted-foreground">
          {dict.completed}{" "}
          {attempt.completedAt
            ? new Date(attempt.completedAt).toLocaleDateString(
                locale === "el" ? "el-GR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )
            : dict.inProgress}
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
