import type { QuestionProgress } from "../../../types";

export function createInitialProgress(
  questionId: string
): QuestionProgress {
  return {
    questionId,
    category: "medium",

    correctStreak: 0,
    incorrectStreak: 0,

    totalAttempts: 0,
    totalCorrect: 0,
    totalIncorrect: 0,

    lastAttemptAt: null,
  };
}
