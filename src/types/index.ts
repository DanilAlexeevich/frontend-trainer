// Категория освоения вопроса
export type MasteryCategory = "easy" | "medium" | "deadly";

// Режим прохождения теста
export type QuizMode = "easy" | "medium" | "deadly";

// Количество вопросов в тесте
export type QuizLength = 5 | 20 | 50;

// Форматы вопросов
export type QuestionType =
  | "single-choice"
  | "code-output"
  | "short-answer"
  | "code-task";

// Тема вопроса
export interface Topic {
  id: string;
  title: string;
  description?: string;
}

// Вариант ответа
export interface AnswerOption {
  id: string;
  text: string;
}

// Общие свойства любого вопроса
interface BaseQuestion {
  id: string;
  topicId: string;
  type: QuestionType;
  prompt: string;
  explanation: string;
}

// Вопрос с выбором одного ответа
export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  options: AnswerOption[];
  correctOptionId: string;
}

// Задача на определение результата выполнения кода
export interface CodeOutputQuestion extends BaseQuestion {
  type: "code-output";
  code: string;
  options: AnswerOption[];
  correctOptionId: string;
}

// Вопрос с текстовым ответом
export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short-answer";
  acceptedAnswers: string[];
}

// Практическая задача на написание кода
export interface CodeTaskQuestion extends BaseQuestion {
  type: "code-task";
  requirements: string[];
  starterCode?: string;
}

// Общий тип вопроса
export type Question =
  | SingleChoiceQuestion
  | CodeOutputQuestion
  | ShortAnswerQuestion
  | CodeTaskQuestion;

// Прогресс освоения конкретного вопроса
export interface QuestionProgress {
  questionId: string;
  category: MasteryCategory;

  correctStreak: number;
  incorrectStreak: number;

  totalAttempts: number;
  totalCorrect: number;
  totalIncorrect: number;

  lastAttemptAt: string | null;
}

// Ответ пользователя на вопрос
export interface QuizAnswer {
  questionId: string;
  value: string;
  isCorrect: boolean;
  answeredAt: string;
}

// Сохранённый результат одного вопроса.
// questionSnapshot нужен, чтобы старые тесты не менялись
// при последующем редактировании банка вопросов.
export interface QuizQuestionResult {
  questionSnapshot: Question;
  answer: QuizAnswer;
}

// Сохранённый результат теста
export interface QuizSession {
  id: string;
  mode: QuizMode;
  startedAt: string;
  completedAt: string;

  totalQuestions: number;
  correctAnswers: number;
  percentage: number;

  results: QuizQuestionResult[];
}

// Настройки нового теста
export interface QuizSettings {
  mode: QuizMode;
  length: QuizLength;
}

// Текущая незавершённая сессия тестирования
export interface ActiveQuizSession {
  id: string;
  mode: QuizMode;
  startedAt: string;

  // Вопросы, выбранные для этого теста
  questions: Question[];

  // Индекс текущего вопроса (начинается с 0)
  currentQuestionIndex: number;

  // Ответы, которые пользователь уже дал
  answers: QuizAnswer[];
}
