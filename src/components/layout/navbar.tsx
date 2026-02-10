import Link from "next/link"
import { auth } from "@/lib/auth"
import { UserMenu } from "./user-menu"
import { BookOpen, Trophy, History, LayoutDashboard } from "lucide-react"

export async function Navbar() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            History Quiz
          </span>
        </Link>

        {session?.user && (
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <Link
              href="/quizzes"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Quizzes</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>
            <div className="ml-2">
              <UserMenu user={session.user} />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
