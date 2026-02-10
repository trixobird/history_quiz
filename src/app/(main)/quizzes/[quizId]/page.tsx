import { getQuizById } from "@/actions/quiz"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DifficultyBadge } from "@/components/quiz/difficulty-badge"
import { ERA_LABELS, ERA_GRADIENTS } from "@/lib/constants"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"

export default async function QuizDetailPage({
  params,
}: {
  params: Promise<{ quizId: string }>
}) {
  const { quizId } = await params
  const quiz = await getQuizById(quizId)
  if (!quiz) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        href="/quizzes"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to quizzes
      </Link>

      <Card className="overflow-hidden">
        <div className={`h-3 bg-gradient-to-r ${ERA_GRADIENTS[quiz.era]}`} />
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {ERA_LABELS[quiz.era]}
          </Badge>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <p className="text-muted-foreground">{quiz.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Difficulty Progression</h3>
            <div className="flex gap-2">
              {quiz.questions.map((q) => (
                <DifficultyBadge key={q.id} difficulty={q.difficulty} />
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {quiz.questions.length} questions &middot; ~2 minutes
          </div>

          <Button asChild size="lg" className="w-full">
            <Link href={`/quizzes/${quizId}/play`}>
              <Play className="h-4 w-4 mr-2" />
              Start Quiz
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
