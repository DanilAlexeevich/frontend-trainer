import type { Question } from "../../../types";

export type AnswerCheckResult = {
  status: "correct" | "incorrect" | "manual";
  isCorrect: boolean | null;
};

// Нормализуем текст перед сравнением
function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function checkAnswer(
  question: Question,
  value: string,
): AnswerCheckResult {
  switch (question.type) {
    case "single-choice":
    case "code-output": {
      const isCorrect = value === question.correctOptionId;

      return {
        status: isCorrect ? "correct" : "incorrect",
        isCorrect,
      };
    }

    case "short-answer": {
      const normalizedValue = normalizeAnswer(value);

      const isCorrect = question.acceptedAnswers.some(
        (answer) => normalizeAnswer(answer) === normalizedValue,
      );

      return {
        status: isCorrect ? "correct" : "incorrect",
        isCorrect,
      };
    }

    case "code-task": {
      return {
        status: "manual",
        isCorrect: null,
      };
    }

    default: {
      const exhaustiveCheck: never = question;
      return exhaustiveCheck;
    }
  }
}
