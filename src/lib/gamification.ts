import { Difficulty } from "@prisma/client"
import { POINT_VALUES } from "./constants"

export const LEVEL_THRESHOLDS = [
  { level: 1, pointsRequired: 0 },
  { level: 2, pointsRequired: 200 },
  { level: 3, pointsRequired: 500 },
  { level: 4, pointsRequired: 1000 },
  { level: 5, pointsRequired: 2000 },
  { level: 6, pointsRequired: 3500 },
  { level: 7, pointsRequired: 5500 },
  { level: 8, pointsRequired: 8000 },
  { level: 9, pointsRequired: 12000 },
  { level: 10, pointsRequired: 18000 },
] as const

export function calculateLevel(totalPoints: number) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVEL_THRESHOLDS[i].pointsRequired) {
      return {
        level: LEVEL_THRESHOLDS[i].level,
      }
    }
  }
  return { level: 1 }
}

export function getNextLevel(totalPoints: number) {
  const current = calculateLevel(totalPoints)
  const next = LEVEL_THRESHOLDS.find(
    (t) => t.pointsRequired > totalPoints
  )
  if (!next) return null
  return {
    ...next,
    pointsNeeded: next.pointsRequired - totalPoints,
    progress:
      ((totalPoints - LEVEL_THRESHOLDS[current.level - 1].pointsRequired) /
        (next.pointsRequired - LEVEL_THRESHOLDS[current.level - 1].pointsRequired)) *
      100,
  }
}

const STREAK_WINDOW_MS = 48 * 60 * 60 * 1000 // 48 hours

export function calculateStreak(
  currentStreak: number,
  longestStreak: number,
  lastQuizDate: Date | null,
  now: Date = new Date()
) {
  let newStreak: number

  if (!lastQuizDate) {
    newStreak = 1
  } else {
    const timeSinceLast = now.getTime() - lastQuizDate.getTime()
    newStreak = timeSinceLast <= STREAK_WINDOW_MS ? currentStreak + 1 : 1
  }

  return {
    newStreak,
    newLongestStreak: Math.max(longestStreak, newStreak),
  }
}

export function getPointsForDifficulty(difficulty: Difficulty): number {
  return POINT_VALUES[difficulty]
}
