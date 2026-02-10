import { getUserStats } from "@/actions/quiz"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "@/components/gamification/stats-card"
import { LevelBadge } from "@/components/gamification/level-badge"
import { StreakIndicator } from "@/components/gamification/streak-indicator"
import { getNextLevel } from "@/lib/gamification"
import { Star, Target, Flame, BookOpen } from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const stats = await getUserStats()
  const nextLevel = getNextLevel(stats.totalPoints)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white">
          {session.user.name?.[0]?.toUpperCase() ||
            session.user.email?.[0]?.toUpperCase() ||
            "?"}
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {session.user.name || "Quiz Player"}
          </h1>
          <p className="text-muted-foreground">{session.user.email}</p>
          <div className="mt-1">
            <LevelBadge level={stats.level} />
          </div>
        </div>
      </div>

      {nextLevel && (
        <Card>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to next level</span>
              <span className="font-medium">
                Lv.{nextLevel.level} {nextLevel.title}
              </span>
            </div>
            <Progress value={nextLevel.progress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {nextLevel.pointsNeeded.toLocaleString()} points to go
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Streaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StreakIndicator
            current={stats.currentStreak}
            longest={stats.longestStreak}
          />
        </CardContent>
      </Card>
    </div>
  )
}
