import { getQuizzes } from "@/actions/quiz"
import { QuizCard } from "@/components/quiz/quiz-card"
import { Badge } from "@/components/ui/badge"
import { ERA_LABELS } from "@/lib/constants"
import { Era } from "@prisma/client"
import Link from "next/link"

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ era?: string }>
}) {
  const { era } = await searchParams
  const selectedEra = era as Era | undefined
  const quizzes = await getQuizzes(selectedEra)
  const eras = Object.entries(ERA_LABELS) as [Era, string][]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse Quizzes</h1>
        <p className="text-muted-foreground mt-1">
          Choose a historical era and test your knowledge
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/quizzes">
          <Badge
            variant={!selectedEra ? "default" : "secondary"}
            className="cursor-pointer text-sm px-3 py-1"
          >
            All
          </Badge>
        </Link>
        {eras.map(([value, label]) => (
          <Link key={value} href={`/quizzes?era=${value}`}>
            <Badge
              variant={selectedEra === value ? "default" : "secondary"}
              className="cursor-pointer text-sm px-3 py-1"
            >
              {label}
            </Badge>
          </Link>
        ))}
      </div>

      {quizzes.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No quizzes found for this era.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              era={quiz.era}
              questionCount={quiz._count.questions}
            />
          ))}
        </div>
      )}
    </div>
  )
}
