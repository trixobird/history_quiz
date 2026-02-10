"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getQuizById, startQuiz, submitAnswer, completeQuiz } from "@/actions/quiz"
import { QuestionDisplay } from "@/components/quiz/question-display"
import { QuizProgressBar } from "@/components/quiz/quiz-progress-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Option {
  id: string
  text: string
  orderIndex: number
  isCorrect: boolean
}

interface Question {
  id: string
  text: string
  difficulty: "EASY" | "MEDIUM" | "HARD" | "EXPERT"
  multipleCorrect: boolean
  options: Option[]
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export default function PlayQuizPage() {
  const params = useParams<{ quizId: string }>()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const quizData = await getQuizById(params.quizId)
      if (!quizData) {
        router.push("/quizzes")
        return
      }
      setQuiz(quizData as Quiz)

      const attempt = await startQuiz(params.quizId)
      setAttemptId(attempt.id)
      setLoading(false)
    }
    init()
  }, [params.quizId, router])

  async function handleSubmitAnswer(selectedOptionIds: string[]) {
    if (!quiz || !attemptId) return
    setIsSubmitting(true)

    try {
      await submitAnswer(attemptId, quiz.questions[currentIndex].id, selectedOptionIds)

      if (currentIndex < quiz.questions.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        const result = await completeQuiz(attemptId)
        router.push(`/quizzes/${params.quizId}/results/${result.id}`)
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !quiz) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentIndex]

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      <QuizProgressBar current={currentIndex} total={quiz.questions.length} />
      <QuestionDisplay
        key={currentQuestion.id}
        question={{
          id: currentQuestion.id,
          text: currentQuestion.text,
          difficulty: currentQuestion.difficulty,
          multipleCorrect: currentQuestion.multipleCorrect,
          options: currentQuestion.options.map((o) => ({
            id: o.id,
            text: o.text,
            orderIndex: o.orderIndex,
          })),
        }}
        onSubmit={handleSubmitAnswer}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
