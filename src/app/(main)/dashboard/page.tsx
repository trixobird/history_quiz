import { getUserStats, getUserHistory, getQuizzes } from "@/actions/quiz"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/gamification/stats-card"
import { LevelBadge } from "@/components/gamification/level-badge"
import { getNextLevel } from "@/lib/gamification"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary, getEraLabel, getLevelTitle, t } from "@/lib/i18n/dictionaries"
import { Star, BookOpen, Target, Flame, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const [stats, history, quizzes, locale] = await Promise.all([
    getUserStats(),
    getUserHistory(),
    getQuizzes(),
    getLocale(),
  ])

  const dict = getDictionary(locale)
  const nextLevel = getNextLevel(stats.totalPoints)
  const recentAttempts = history.slice(0, 5)

  const takenQuizIds = new Set(history.map((a) => a.quiz.id))
  const recommendedQuiz = quizzes.find((q) => !takenQuizIds.has(q.id))

  const userName = session.user.name || dict.quizPlayer

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {t(dict.welcomeBack, { name: userName })}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <LevelBadge level={stats.level} />
          <span className="text-muted-foreground">
            &middot; {stats.totalPoints.toLocaleString()} {dict.points}
          </span>
        </div>
      </div>

      {nextLevel && (
        <Card>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t(dict.nextLevel, { level: nextLevel.level, title: getLevelTitle(nextLevel.level, dict) })}
              </span>
              <span className="font-medium">
                {t(dict.ptsToGo, { pts: nextLevel.pointsNeeded.toLocaleString() })}
              </span>
            </div>
            <Progress value={nextLevel.progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label={dict.totalPoints}
          value={stats.totalPoints.toLocaleString()}
          icon={Star}
          gradient="from-primary to-accent"
        />
        <StatsCard
          label={dict.quizzesCompleted}
          value={stats.completedQuizzes}
          icon={BookOpen}
          gradient="from-emerald-400 to-teal-600"
        />
        <StatsCard
          label={dict.averageScore}
          value={`${stats.averageScore}%`}
          icon={Target}
          gradient="from-amber-400 to-orange-600"
        />
        <StatsCard
          label={dict.currentStreak}
          value={stats.currentStreak}
          icon={Flame}
          gradient="from-orange-400 to-red-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {recommendedQuiz && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">{dict.recommendedQuiz}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">{recommendedQuiz.title}</h3>
                <Badge variant="secondary" className="mt-1">
                  {getEraLabel(recommendedQuiz.era, dict)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {recommendedQuiz.description}
                </p>
              </div>
              <Button asChild>
                <Link href={`/quizzes/${recommendedQuiz.id}`}>
                  {dict.startQuiz}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{dict.recentActivity}</CardTitle>
            {recentAttempts.length > 0 && (
              <Link
                href="/history"
                className="text-sm text-primary hover:underline"
              >
                {dict.viewAll}
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {recentAttempts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                {dict.noQuizzesYet}{" "}
                <Link href="/quizzes" className="text-primary hover:underline">
                  {dict.browseQuizzes}
                </Link>
              </p>
            ) : (
              <div className="space-y-3">
                {recentAttempts.map((attempt) => (
                  <Link
                    key={attempt.id}
                    href={`/history/${attempt.id}`}
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-secondary transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">{attempt.quiz.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.completedAt
                          ? new Date(attempt.completedAt).toLocaleDateString(
                              locale === "el" ? "el-GR" : "en-US"
                            )
                          : ""}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        attempt.percentage >= 80
                          ? "text-green-500"
                          : attempt.percentage >= 50
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {Math.round(attempt.percentage)}%
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
