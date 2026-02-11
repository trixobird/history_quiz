import { getLeaderboard } from "@/actions/quiz"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaderboardTable } from "@/components/gamification/leaderboard-table"
import { Trophy } from "lucide-react"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default async function LeaderboardPage() {
  const [entries, session, locale] = await Promise.all([
    getLeaderboard(),
    auth(),
    getLocale(),
  ])
  const dict = getDictionary(locale)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          {dict.leaderboard}
        </h1>
        <p className="text-muted-foreground mt-1">
          {dict.leaderboardDesc}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dict.globalRankings}</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {dict.noPlayersYet}
            </p>
          ) : (
            <LeaderboardTable
              entries={entries}
              currentUserId={session?.user?.id}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
