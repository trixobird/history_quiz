import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ERA_LABELS, ERA_GRADIENTS } from "@/lib/constants"
import { Era } from "@prisma/client"

interface QuizCardProps {
  id: string
  title: string
  description: string
  era: Era
  questionCount: number
}

export function QuizCard({ id, title, description, era, questionCount }: QuizCardProps) {
  return (
    <Link href={`/quizzes/${id}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${ERA_GRADIENTS[era]}`} />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {ERA_LABELS[era]}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {questionCount} questions
            </span>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
