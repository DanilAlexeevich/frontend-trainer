import type { ActiveQuizSession, Question, QuizMode } from "../../../types";

type CreateActiveQuizSessionParams = {
  questions: Question[];
  mode: QuizMode;
};

export function createActiveQuizSession({
  questions,
  mode,
}: CreateActiveQuizSessionParams): ActiveQuizSession {
  return {
    id: crypto.randomUUID(),
    mode,
    startedAt: new Date().toISOString(),

    questions: [...questions],

    currentQuestionIndex: 0,
    answers: [],
  };
}
