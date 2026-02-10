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
import { ERA_LABELS } from "@/lib/constants"
import { Star, BookOpen, Target, Flame, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const [stats, history, quizzes] = await Promise.all([
    getUserStats(),
    getUserHistory(),
    getQuizzes(),
  ])

  const nextLevel = getNextLevel(stats.totalPoints)
  const recentAttempts = history.slice(0, 5)

  // Find a quiz the user hasn't taken yet
  const takenQuizIds = new Set(history.map((a) => a.quiz.id))
  const recommendedQuiz = quizzes.find((q) => !takenQuizIds.has(q.id))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name || "Quiz Player"}!
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <LevelBadge level={stats.level} />
          <span className="text-muted-foreground">
            &middot; {stats.totalPoints.toLocaleString()} points
          </span>
        </div>
      </div>

      {nextLevel && (
        <Card>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Next: Lv.{nextLevel.level} {nextLevel.title}
              </span>
              <span className="font-medium">
                {nextLevel.pointsNeeded.toLocaleString()} pts to go
              </span>
            </div>
            <Progress value={nextLevel.progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total Points"
          value={stats.totalPoints.toLocaleString()}
          icon={Star}
          gradient="from-primary to-accent"
        />
        <StatsCard
          label="Quizzes Completed"
          value={stats.completedQuizzes}
          icon={BookOpen}
          gradient="from-emerald-400 to-teal-600"
        />
        <StatsCard
          label="Average Score"
          value={`${stats.averageScore}%`}
          icon={Target}
          gradient="from-amber-400 to-orange-600"
        />
        <StatsCard
          label="Current Streak"
          value={stats.currentStreak}
          icon={Flame}
          gradient="from-orange-400 to-red-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {recommendedQuiz && (
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Recommended Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold">{recommendedQuiz.title}</h3>
                <Badge variant="secondary" className="mt-1">
                  {ERA_LABELS[recommendedQuiz.era]}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {recommendedQuiz.description}
                </p>
              </div>
              <Button asChild>
                <Link href={`/quizzes/${recommendedQuiz.id}`}>
                  Start Quiz
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            {recentAttempts.length > 0 && (
              <Link
                href="/history"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {recentAttempts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No quizzes completed yet.{" "}
                <Link href="/quizzes" className="text-primary hover:underline">
                  Browse quizzes
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
                          ? new Date(attempt.completedAt).toLocaleDateString()
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
