"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Era } from "@prisma/client"
import {
  calculateStreak,
  calculateLevel,
  getPointsForDifficulty,
} from "@/lib/gamification"
import { MAX_QUIZ_SCORE } from "@/lib/constants"

async function getSessionUser() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")
  return session.user.id
}

export async function getQuizzes(era?: Era) {
  return prisma.quiz.findMany({
    where: era ? { era } : undefined,
    include: {
      _count: { select: { questions: true } },
    },
    orderBy: { createdAt: "asc" },
  })
}

export async function getQuizById(quizId: string) {
  return prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        orderBy: { orderIndex: "asc" },
        include: {
          options: { orderBy: { orderIndex: "asc" } },
        },
      },
    },
  })
}

export async function startQuiz(quizId: string) {
  const userId = await getSessionUser()

  // Check for existing in-progress attempt
  const existing = await prisma.quizAttempt.findFirst({
    where: { userId, quizId, completedAt: null },
  })
  if (existing) return existing

  return prisma.quizAttempt.create({
    data: { userId, quizId, maxScore: MAX_QUIZ_SCORE },
  })
}

export async function submitAnswer(
  attemptId: string,
  questionId: string,
  selectedOptionIds: string[]
) {
  const userId = await getSessionUser()

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: { quiz: true },
  })
  if (!attempt || attempt.userId !== userId) throw new Error("Invalid attempt")
  if (attempt.completedAt) throw new Error("Quiz already completed")

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { options: true },
  })
  if (!question || question.quizId !== attempt.quizId) {
    throw new Error("Invalid question")
  }

  // Check if already answered
  const existingAnswer = await prisma.userAnswer.findUnique({
    where: { attemptId_questionId: { attemptId, questionId } },
  })
  if (existingAnswer) throw new Error("Already answered")

  // Calculate correctness
  const correctOptionIds = question.options
    .filter((o) => o.isCorrect)
    .map((o) => o.id)
    .sort()

  const selectedSorted = [...selectedOptionIds].sort()

  const isCorrect =
    correctOptionIds.length === selectedSorted.length &&
    correctOptionIds.every((id, i) => id === selectedSorted[i])

  const pointsEarned = isCorrect ? getPointsForDifficulty(question.difficulty) : 0

  return prisma.userAnswer.create({
    data: {
      attemptId,
      questionId,
      isCorrect,
      pointsEarned,
      selectedOptions: {
        connect: selectedOptionIds.map((id) => ({ id })),
      },
    },
  })
}

export async function completeQuiz(attemptId: string) {
  const userId = await getSessionUser()

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: { answers: true, user: true },
  })
  if (!attempt || attempt.userId !== userId) throw new Error("Invalid attempt")
  if (attempt.completedAt) throw new Error("Already completed")

  const totalScore = attempt.answers.reduce((sum, a) => sum + a.pointsEarned, 0)
  const percentage = attempt.maxScore > 0 ? (totalScore / attempt.maxScore) * 100 : 0

  const { newStreak, newLongestStreak } = calculateStreak(
    attempt.user.currentStreak,
    attempt.user.longestStreak,
    attempt.user.lastQuizDate
  )

  const newTotalPoints = attempt.user.totalPoints + totalScore
  const { level } = calculateLevel(newTotalPoints)

  const [updatedAttempt] = await prisma.$transaction([
    prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { score: totalScore, percentage, completedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: newTotalPoints,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        level,
        lastQuizDate: new Date(),
      },
    }),
  ])

  return updatedAttempt
}

export async function getAttemptResults(attemptId: string) {
  const userId = await getSessionUser()

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      quiz: true,
      answers: {
        orderBy: { question: { orderIndex: "asc" } },
        include: {
          question: {
            include: { options: { orderBy: { orderIndex: "asc" } } },
          },
          selectedOptions: true,
        },
      },
    },
  })

  if (!attempt || attempt.userId !== userId) throw new Error("Invalid attempt")
  return attempt
}

export async function getUserHistory() {
  const userId = await getSessionUser()

  return prisma.quizAttempt.findMany({
    where: { userId, completedAt: { not: null } },
    include: { quiz: true },
    orderBy: { completedAt: "desc" },
  })
}

export async function getLeaderboard(limit = 20) {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      totalPoints: true,
      level: true,
      currentStreak: true,
      _count: { select: { quizAttempts: { where: { completedAt: { not: null } } } } },
    },
    orderBy: { totalPoints: "desc" },
    take: limit,
  })
}

export async function getUserStats() {
  const userId = await getSessionUser()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      quizAttempts: {
        where: { completedAt: { not: null } },
        select: { percentage: true },
      },
    },
  })
  if (!user) throw new Error("User not found")

  const completedCount = user.quizAttempts.length
  const averageScore =
    completedCount > 0
      ? user.quizAttempts.reduce((sum, a) => sum + a.percentage, 0) / completedCount
      : 0

  return {
    totalPoints: user.totalPoints,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    level: user.level,
    completedQuizzes: completedCount,
    averageScore: Math.round(averageScore * 10) / 10,
  }
}
