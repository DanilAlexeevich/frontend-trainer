import type {
  ActiveQuizSession,
  QuizAnswer,
  QuizSession,
} from "../../../types";

type SubmitQuizAnswerParams = {
  session: ActiveQuizSession;
  value: string;
  isCorrect: boolean;
  answeredAt?: string;
};

type SubmitQuizAnswerResult = {
  answer: QuizAnswer;
  activeSession: ActiveQuizSession | null;
  completedSession: QuizSession | null;
};

export function submitQuizAnswer({
  session,
  value,
  isCorrect,
  answeredAt = new Date().toISOString(),
}: SubmitQuizAnswerParams): SubmitQuizAnswerResult {
  const currentQuestion = session.questions[session.currentQuestionIndex];

  if (!currentQuestion) {
    throw new Error("Текущий вопрос не найден");
  }

  // Создаём объект ответа
  const answer: QuizAnswer = {
    questionId: currentQuestion.id,
    value,
    isCorrect,
    answeredAt,
  };

  // Добавляем ответ к уже существующим
  const updatedAnswers = [...session.answers, answer];

  // Проверяем, является ли вопрос последним
  const isLastQuestion =
    session.currentQuestionIndex === session.questions.length - 1;

  // Если вопросы ещё остались — переходим дальше
  if (!isLastQuestion) {
    return {
      answer,
      activeSession: {
        ...session,
        answers: updatedAnswers,
        currentQuestionIndex: session.currentQuestionIndex + 1,
      },
      completedSession: null,
    };
  }

  // Все вопросы пройдены — формируем итоговую сессию
  const results = updatedAnswers.map((userAnswer) => {
    const question = session.questions.find(
      (item) => item.id === userAnswer.questionId,
    );

    if (!question) {
      throw new Error(`Вопрос ${userAnswer.questionId} не найден`);
    }

    return {
      questionSnapshot: question,
      answer: userAnswer,
    };
  });

  const correctAnswers = updatedAnswers.filter((item) => item.isCorrect).length;

  const totalQuestions = session.questions.length;

  const completedSession: QuizSession = {
    id: session.id,
    mode: session.mode,
    startedAt: session.startedAt,
    completedAt: answeredAt,

    totalQuestions,
    correctAnswers,
    percentage: Math.round((correctAnswers / totalQuestions) * 100),

    results,
  };

  return {
    answer,
    activeSession: null,
    completedSession,
  };
}
