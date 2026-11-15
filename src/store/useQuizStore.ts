import { create } from "zustand";

import type {
  ActiveQuizSession,
  Question,
  QuestionProgress,
  QuizLength,
  QuizMode,
  QuizSession,
} from "../types";

import { questions } from "../data/questions";

import { createInitialProgress } from "../features/quiz/utils/createInitialProgress";
import { updateQuestionProgress } from "../features/quiz/utils/updateQuestionProgress";
import { selectQuestionsForQuiz } from "../features/quiz/utils/selectQuestionsForQuiz";
import { createActiveQuizSession } from "../features/quiz/utils/createActiveQuizSession";
import { submitQuizAnswer } from "../features/quiz/utils/submitQuizAnswer";

// Описываем состояние и действия хранилища
interface QuizStore {
  progress: Record<string, QuestionProgress>;

  sessions: QuizSession[];

  activeSession: ActiveQuizSession | null;

  initializeProgress: () => void;

  recordAnswer: (
    questionId: string,
    isCorrect: boolean,
    answeredAt?: string,
  ) => void;

  addSession: (session: QuizSession) => void;

  prepareQuiz: (
    mode: QuizMode,
    length: QuizLength,
  ) => ReturnType<typeof selectQuestionsForQuiz>;

  startQuiz: (mode: QuizMode, selectedQuestions: Question[]) => void;

  submitAnswer: (value: string, isCorrect: boolean) => void;

  cancelQuiz: () => void;
}

// Создаём начальный прогресс для всех вопросов
function createProgressMap(): Record<string, QuestionProgress> {
  return Object.fromEntries(
    questions.map((question) => [
      question.id,
      createInitialProgress(question.id),
    ]),
  );
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  progress: createProgressMap(),

  sessions: [],

  activeSession: null,

  // Добавляем прогресс для новых вопросов
  initializeProgress: () => {
    set((state) => {
      const updatedProgress = { ...state.progress };

      questions.forEach((question) => {
        if (!updatedProgress[question.id]) {
          updatedProgress[question.id] = createInitialProgress(question.id);
        }
      });

      return { progress: updatedProgress };
    });
  },

  // Обновляем прогресс отдельного вопроса
  recordAnswer: (questionId, isCorrect, answeredAt) => {
    set((state) => {
      const currentProgress =
        state.progress[questionId] ?? createInitialProgress(questionId);

      const updatedProgress = updateQuestionProgress({
        progress: currentProgress,
        isCorrect,
        answeredAt,
      });

      return {
        progress: {
          ...state.progress,
          [questionId]: updatedProgress,
        },
      };
    });
  },

  // Добавляем завершённый тест в историю
  addSession: (session) => {
    set((state) => ({
      sessions: [session, ...state.sessions],
    }));
  },

  // Подготавливаем вопросы для нового теста
  prepareQuiz: (mode, length) => {
    const { progress } = get();

    return selectQuestionsForQuiz({
      questions,
      progress,
      mode,
      length,
    });
  },

  // Создаём текущую сессию
  startQuiz: (mode, selectedQuestions) => {
    if (selectedQuestions.length === 0) {
      throw new Error("Нельзя начать тест без вопросов");
    }

    const session = createActiveQuizSession({
      questions: selectedQuestions,
      mode,
    });

    set({ activeSession: session });
  },

  // Принимаем ответ пользователя
  submitAnswer: (value, isCorrect) => {
    const state = get();
    const session = state.activeSession;

    if (!session) {
      throw new Error("Нет активного теста");
    }

    const currentQuestion = session.questions[session.currentQuestionIndex];

    if (!currentQuestion) {
      throw new Error("Текущий вопрос не найден");
    }

    const result = submitQuizAnswer({
      session,
      value,
      isCorrect,
    });

    const currentProgress =
      state.progress[currentQuestion.id] ??
      createInitialProgress(currentQuestion.id);

    const updatedProgress = updateQuestionProgress({
      progress: currentProgress,
      isCorrect,
      answeredAt: result.answer.answeredAt,
    });

    set((currentState) => ({
      activeSession: result.activeSession,

      progress: {
        ...currentState.progress,
        [currentQuestion.id]: updatedProgress,
      },

      sessions: result.completedSession
        ? [result.completedSession, ...currentState.sessions]
        : currentState.sessions,
    }));
  },

  // Отменяем текущий тест
  cancelQuiz: () => {
    set({ activeSession: null });
  },
}));
