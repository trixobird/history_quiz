"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LevelBadge } from "./level-badge"
import { Trophy } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-context"

interface LeaderboardEntry {
  id: string
  name: string | null
  email: string
  image: string | null
  totalPoints: number
  level: number
  currentStreak: number
  _count: { quizAttempts: number }
}

export function LeaderboardTable({
  entries,
  currentUserId,
}: {
  entries: LeaderboardEntry[]
  currentUserId?: string
}) {
  const { dict } = useLocale()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>{dict.colPlayer}</TableHead>
          <TableHead>{dict.colLevel}</TableHead>
          <TableHead className="text-right">{dict.colPoints}</TableHead>
          <TableHead className="text-right">{dict.colQuizzes}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, index) => {
          const isCurrentUser = entry.id === currentUserId
          return (
            <TableRow
              key={entry.id}
              className={isCurrentUser ? "bg-primary/5" : undefined}
            >
              <TableCell className="font-medium">
                {index < 3 ? (
                  <Trophy
                    className={`h-5 w-5 ${
                      index === 0
                        ? "text-yellow-500"
                        : index === 1
                        ? "text-gray-400"
                        : "text-amber-600"
                    }`}
                  />
                ) : (
                  index + 1
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {entry.name?.[0]?.toUpperCase() ||
                        entry.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {entry.name || entry.email.split("@")[0]}
                      {isCurrentUser && (
                        <span className="text-muted-foreground ml-1">({dict.you})</span>
                      )}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <LevelBadge level={entry.level} />
              </TableCell>
              <TableCell className="text-right font-semibold">
                {entry.totalPoints.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {entry._count.quizAttempts}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
