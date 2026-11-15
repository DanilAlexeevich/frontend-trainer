import type { QuestionProgress } from "../../../types";

// Параметры обновления прогресса
type UpdateQuestionProgressParams = {
  progress: QuestionProgress;
  isCorrect: boolean;
  answeredAt?: string;
};

export function updateQuestionProgress({
  progress,
  isCorrect,
  answeredAt = new Date().toISOString(),
}: UpdateQuestionProgressParams): QuestionProgress {
  // Создаём копию, чтобы не изменять исходный объект
  const updated: QuestionProgress = {
    ...progress,
    totalAttempts: progress.totalAttempts + 1,
    totalCorrect: progress.totalCorrect + (isCorrect ? 1 : 0),
    totalIncorrect: progress.totalIncorrect + (isCorrect ? 0 : 1),
    lastAttemptAt: answeredAt,
  };

  switch (progress.category) {
    case "medium": {
      if (isCorrect) {
        updated.correctStreak += 1;
        updated.incorrectStreak = 0;

        // Два правильных ответа подряд → easy
        if (updated.correctStreak >= 2) {
          updated.category = "easy";
          updated.correctStreak = 0;
          updated.incorrectStreak = 0;
        }
      } else {
        updated.incorrectStreak += 1;
        updated.correctStreak = 0;

        // Два неправильных ответа подряд → deadly
        if (updated.incorrectStreak >= 2) {
          updated.category = "deadly";
          updated.correctStreak = 0;
          updated.incorrectStreak = 0;
        }
      }

      break;
    }

    case "easy": {
      if (!isCorrect) {
        // Одна ошибка → возвращаем вопрос в medium
        updated.category = "medium";
        updated.correctStreak = 0;
        updated.incorrectStreak = 0;
      } else {
        updated.correctStreak += 1;
        updated.incorrectStreak = 0;
      }

      break;
    }

    case "deadly": {
      if (isCorrect) {
        updated.correctStreak += 1;
        updated.incorrectStreak = 0;

        // Пять правильных ответов подряд → medium
        if (updated.correctStreak >= 5) {
          updated.category = "medium";
          updated.correctStreak = 0;
          updated.incorrectStreak = 0;
        }
      } else {
        updated.incorrectStreak += 1;
        updated.correctStreak = 0;
      }

      break;
    }
  }

  return updated;
}
