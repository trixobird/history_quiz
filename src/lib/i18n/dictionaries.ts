import en from "./en"
import el from "./el"
import { Era, Difficulty } from "@prisma/client"

export type Locale = "en" | "el"

export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { en, el }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}

const ERA_KEYS: Record<Era, keyof Dictionary> = {
  ANCIENT_WORLD: "eraAncientWorld",
  MEDIEVAL: "eraMedieval",
  RENAISSANCE: "eraRenaissance",
  AGE_OF_EXPLORATION: "eraAgeOfExploration",
  INDUSTRIAL_REVOLUTION: "eraIndustrialRevolution",
  WORLD_WAR_1: "eraWorldWar1",
  WORLD_WAR_2: "eraWorldWar2",
  COLD_WAR: "eraColdWar",
  MODERN_HISTORY: "eraModernHistory",
  MIXED_GENERAL: "eraMixedGeneral",
}

const DIFFICULTY_KEYS: Record<Difficulty, keyof Dictionary> = {
  EASY: "diffEasy",
  MEDIUM: "diffMedium",
  HARD: "diffHard",
  EXPERT: "diffExpert",
}

const LEVEL_KEYS: Record<number, keyof Dictionary> = {
  1: "levelHistoryNovice",
  2: "levelCuriousStudent",
  3: "levelAmateurHistorian",
  4: "levelKnowledgeSeeker",
  5: "levelHistoryBuff",
  6: "levelChronicleKeeper",
  7: "levelMasterScholar",
  8: "levelHistorySage",
  9: "levelGrandHistorian",
  10: "levelLegendaryOracle",
}

export function getEraLabel(era: Era, dict: Dictionary): string {
  return dict[ERA_KEYS[era]]
}

export function getDifficultyLabel(diff: Difficulty, dict: Dictionary): string {
  return dict[DIFFICULTY_KEYS[diff]]
}

export function getLevelTitle(level: number, dict: Dictionary): string {
  return dict[LEVEL_KEYS[level]] ?? dict.levelHistoryNovice
}

export function getEraLabelsMap(dict: Dictionary): Record<Era, string> {
  const entries = Object.entries(ERA_KEYS) as [Era, keyof Dictionary][]
  return Object.fromEntries(entries.map(([era, key]) => [era, dict[key]])) as Record<Era, string>
}

export function t(template: string, vars: Record<string, string | number>): string {
  let result = template
  for (const [key, val] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, String(val))
  }
  return result
}
