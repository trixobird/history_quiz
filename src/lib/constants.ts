import { Era, Difficulty } from "@prisma/client"

export const ERA_LABELS: Record<Era, string> = {
  ANCIENT_WORLD: "Ancient World",
  MEDIEVAL: "Medieval",
  RENAISSANCE: "Renaissance",
  AGE_OF_EXPLORATION: "Age of Exploration",
  INDUSTRIAL_REVOLUTION: "Industrial Revolution",
  WORLD_WAR_1: "World War I",
  WORLD_WAR_2: "World War II",
  COLD_WAR: "Cold War",
  MODERN_HISTORY: "Modern History",
  MIXED_GENERAL: "Mixed / General",
}

export const ERA_COLORS: Record<Era, string> = {
  ANCIENT_WORLD: "bg-amber-500",
  MEDIEVAL: "bg-stone-500",
  RENAISSANCE: "bg-violet-500",
  AGE_OF_EXPLORATION: "bg-sky-500",
  INDUSTRIAL_REVOLUTION: "bg-zinc-600",
  WORLD_WAR_1: "bg-red-600",
  WORLD_WAR_2: "bg-red-700",
  COLD_WAR: "bg-blue-700",
  MODERN_HISTORY: "bg-emerald-500",
  MIXED_GENERAL: "bg-fuchsia-500",
}

export const ERA_GRADIENTS: Record<Era, string> = {
  ANCIENT_WORLD: "from-amber-400 to-orange-600",
  MEDIEVAL: "from-stone-400 to-stone-700",
  RENAISSANCE: "from-violet-400 to-purple-700",
  AGE_OF_EXPLORATION: "from-sky-400 to-blue-600",
  INDUSTRIAL_REVOLUTION: "from-zinc-400 to-zinc-700",
  WORLD_WAR_1: "from-red-400 to-red-700",
  WORLD_WAR_2: "from-rose-400 to-red-800",
  COLD_WAR: "from-blue-400 to-indigo-800",
  MODERN_HISTORY: "from-emerald-400 to-teal-700",
  MIXED_GENERAL: "from-fuchsia-400 to-pink-700",
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
  EXPERT: "Expert",
}

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  EASY: "bg-green-500 text-white",
  MEDIUM: "bg-yellow-500 text-white",
  HARD: "bg-orange-500 text-white",
  EXPERT: "bg-red-500 text-white",
}

export const POINT_VALUES: Record<Difficulty, number> = {
  EASY: 10,
  MEDIUM: 25,
  HARD: 50,
  EXPERT: 100,
}

export const MAX_QUIZ_SCORE =
  POINT_VALUES.EASY + POINT_VALUES.MEDIUM + POINT_VALUES.HARD + POINT_VALUES.EXPERT
