import type {
  Question,
  QuestionProgress,
  QuizLength,
  QuizMode,
} from "../../../types";

interface SelectQuizQuestionsParams {
  questions: Question[];
  progress: Record<string, QuestionProgress>;
  mode: QuizMode;
  length: QuizLength;
}

// Перемешивание массива алгоритмом Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function selectQuizQuestions({
  questions,
  progress,
  mode,
  length,
}: SelectQuizQuestionsParams): Question[] {
  // Оставляем только вопросы нужной категории
  const availableQuestions = questions.filter((question) => {
    const category = progress[question.id]?.category ?? "medium";

    return category === mode;
  });

  // В обычном режиме сначала выбираем новые вопросы
  if (mode === "medium") {
    const unansweredQuestions = availableQuestions.filter((question) => {
      const attempts = progress[question.id]?.totalAttempts ?? 0;

      return attempts === 0;
    });

    const answeredQuestions = availableQuestions.filter((question) => {
      const attempts = progress[question.id]?.totalAttempts ?? 0;

      return attempts > 0;
    });

    const prioritizedQuestions = [
      ...shuffle(unansweredQuestions),
      ...shuffle(answeredQuestions),
    ];

    return prioritizedQuestions.slice(0, length);
  }

  // В easy и deadly просто случайно выбираем вопросы категории
  return shuffle(availableQuestions).slice(0, length);
}
