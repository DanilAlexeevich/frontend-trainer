import type {
  Question,
  QuestionProgress,
  QuizLength,
  QuizMode,
} from "../../../types";

type SelectQuestionsParams = {
  questions: Question[];
  progress: Record<string, QuestionProgress>;
  mode: QuizMode;
  length: QuizLength;
};

type SelectQuestionsResult = {
  questions: Question[];
  requestedLength: number;
  availableLength: number;
  hasEnoughQuestions: boolean;
};

// Перемешивание массива алгоритмом Fisher-Yates
function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function selectQuestionsForQuiz({
  questions,
  progress,
  mode,
  length,
}: SelectQuestionsParams): SelectQuestionsResult {
  // Убираем возможные дубликаты по ID
  const uniqueQuestions = Array.from(
    new Map(questions.map((question) => [question.id, question])).values(),
  );

  // Оставляем вопросы только нужной категории
  const filteredQuestions = uniqueQuestions.filter((question) => {
    const questionProgress = progress[question.id];

    // Если прогресса пока нет, считаем вопрос новым (medium)
    const category = questionProgress?.category ?? "medium";

    return category === mode;
  });

  let selectedPool: Question[];

  if (mode === "medium") {
    // Новые вопросы имеют приоритет
    const unanswered = filteredQuestions.filter(
      (question) => (progress[question.id]?.totalAttempts ?? 0) === 0,
    );

    const answered = filteredQuestions.filter(
      (question) => (progress[question.id]?.totalAttempts ?? 0) > 0,
    );

    selectedPool = [...shuffle(unanswered), ...shuffle(answered)];
  } else {
    // Easy и deadly выбираются случайным образом
    selectedPool = shuffle(filteredQuestions);
  }

  const selectedQuestions = selectedPool.slice(0, length);

  return {
    questions: selectedQuestions,
    requestedLength: length,
    availableLength: filteredQuestions.length,
    hasEnoughQuestions: filteredQuestions.length >= length,
  };
}
