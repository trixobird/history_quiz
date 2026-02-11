import { getUserHistory } from "@/actions/quiz"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock } from "lucide-react"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary, getEraLabel } from "@/lib/i18n/dictionaries"

export default async function HistoryPage() {
  const [attempts, locale] = await Promise.all([getUserHistory(), getLocale()])
  const dict = getDictionary(locale)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.quizHistory}</h1>
        <p className="text-muted-foreground mt-1">
          {dict.reviewPastAttempts}
        </p>
      </div>

      {attempts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {dict.noCompletedQuizzes}{" "}
              <Link href="/quizzes" className="text-primary hover:underline">
                {dict.takeFirstQuiz}
              </Link>
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {attempts.map((attempt) => (
            <Link
              key={attempt.id}
              href={`/history/${attempt.id}`}
            >
              <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-3xl font-bold ${
                        attempt.percentage >= 80
                          ? "text-green-500"
                          : attempt.percentage >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {Math.round(attempt.percentage)}%
                    </div>
                    <div>
                      <p className="font-medium">{attempt.quiz.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {getEraLabel(attempt.quiz.era, dict)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {attempt.score} / {attempt.maxScore} {dict.pts}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString(
                          locale === "el" ? "el-GR" : "en-US"
                        )
                      : dict.inProgress}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
