import { getLeaderboard } from "@/actions/quiz"
import { auth } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaderboardTable } from "@/components/gamification/leaderboard-table"
import { Trophy } from "lucide-react"

export default async function LeaderboardPage() {
  const [entries, session] = await Promise.all([getLeaderboard(), auth()])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Top history enthusiasts ranked by total points
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No players yet. Be the first to complete a quiz!
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
