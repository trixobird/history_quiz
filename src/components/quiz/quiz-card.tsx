import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ERA_GRADIENTS } from "@/lib/constants"
import { getEraLabel, getDictionary } from "@/lib/i18n/dictionaries"
import { getLocale } from "@/lib/i18n/get-locale"
import { Era } from "@prisma/client"

interface QuizCardProps {
  id: string
  title: string
  description: string
  era: Era
  questionCount: number
}

export async function QuizCard({ id, title, description, era, questionCount }: QuizCardProps) {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <Link href={`/quizzes/${id}`}>
      <Card className="group h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${ERA_GRADIENTS[era]}`} />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {getEraLabel(era, dict)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {questionCount} {dict.questions}
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
