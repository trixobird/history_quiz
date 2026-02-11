import { getQuizzes } from "@/actions/quiz"
import { QuizCard } from "@/components/quiz/quiz-card"
import { Badge } from "@/components/ui/badge"
import { Era } from "@prisma/client"
import Link from "next/link"
import { getLocale } from "@/lib/i18n/get-locale"
import { getDictionary, getEraLabelsMap } from "@/lib/i18n/dictionaries"

export default async function QuizzesPage({
  searchParams,
}: {
  searchParams: Promise<{ era?: string }>
}) {
  const { era } = await searchParams
  const selectedEra = era as Era | undefined
  const [quizzes, locale] = await Promise.all([getQuizzes(selectedEra), getLocale()])
  const dict = getDictionary(locale)
  const eraLabels = getEraLabelsMap(dict)
  const eras = Object.entries(eraLabels) as [Era, string][]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.browseQuizzesTitle}</h1>
        <p className="text-muted-foreground mt-1">
          {dict.browseQuizzesDesc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/quizzes">
          <Badge
            variant={!selectedEra ? "default" : "secondary"}
            className="cursor-pointer text-sm px-3 py-1"
          >
            {dict.all}
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
          {dict.noQuizzesForEra}
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
