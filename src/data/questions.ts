import type { Question, Topic } from "../types";

// Темы приложения
export const topics: Topic[] = [
  {
    id: "javascript",
    title: "JavaScript",
    description: "Основы языка, асинхронность и механизмы JS",
  },
  {
    id: "browser",
    title: "Браузер и Web",
    description: "DOM, CSSOM, сеть и работа браузера",
  },
  {
    id: "http",
    title: "HTTP и API",
    description: "Протокол HTTP, REST API и взаимодействие с сервером",
  },
  {
    id: "react",
    title: "React",
    description: "Компоненты, хуки и управление состоянием",
  },
];

// Банк вопросов
export const questions: Question[] = [
  {
    id: "js-001",
    topicId: "javascript",
    type: "single-choice",
    prompt: "Что такое замыкание (Closure) в JavaScript?",
    options: [
      { id: "a", text: "Функция вместе с её лексическим окружением" },
      { id: "b", text: "Способ создания копии объекта" },
      { id: "c", text: "Механизм обработки ошибок" },
      { id: "d", text: "Способ остановки выполнения функции" },
    ],
    correctOptionId: "a",
    explanation:
      "Замыкание — это функция вместе с доступом к переменным из её внешнего лексического окружения, даже после завершения внешней функции.",
  },
  {
    id: "js-002",
    topicId: "javascript",
    type: "code-output",
    prompt: "Что выведет этот код и в каком порядке?",
    code: `console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");`,
    options: [
      { id: "a", text: "1, 2, 3, 4" },
      { id: "b", text: "1, 4, 3, 2" },
      { id: "c", text: "1, 3, 4, 2" },
      { id: "d", text: "1, 4, 2, 3" },
    ],
    correctOptionId: "b",
    explanation:
      "Сначала выполняется синхронный код: 1 и 4. Затем выполняется микрозадача Promise с выводом 3. После неё выполняется задача setTimeout с выводом 2.",
  },
  {
    id: "js-003",
    topicId: "javascript",
    type: "single-choice",
    prompt: "Чем отличается let от const?",
    options: [
      {
        id: "a",
        text: "let имеет функциональную область видимости, const — блочную",
      },
      { id: "b", text: "Переменную let можно переназначить, const — нельзя" },
      { id: "c", text: "const нельзя использовать внутри функций" },
      { id: "d", text: "Между ними нет никаких различий" },
    ],
    correctOptionId: "b",
    explanation:
      "Оба объявления имеют блочную область видимости. let допускает переназначение, const запрещает повторное присваивание. При этом содержимое объекта или массива, объявленного через const, менять можно.",
  },
  {
    id: "browser-001",
    topicId: "browser",
    type: "single-choice",
    prompt: "Что такое DOM?",
    options: [
      { id: "a", text: "Язык описания внешнего вида страницы" },
      { id: "b", text: "Объектное представление HTML-документа в виде дерева" },
      { id: "c", text: "Протокол передачи данных между сервером и браузером" },
      { id: "d", text: "Механизм хранения файлов браузера" },
    ],
    correctOptionId: "b",
    explanation:
      "DOM (Document Object Model) — программное представление HTML-документа в виде дерева объектов, с которым JavaScript может взаимодействовать.",
  },
  {
    id: "browser-002",
    topicId: "browser",
    type: "single-choice",
    prompt: "Чем отличается Reflow от Repaint?",
    options: [
      {
        id: "a",
        text: "Reflow пересчитывает геометрию элементов, Repaint обновляет их визуальное отображение",
      },
      {
        id: "b",
        text: "Reflow обновляет цвета, Repaint пересчитывает размеры",
      },
      { id: "c", text: "Это два названия одного процесса" },
      { id: "d", text: "Reflow выполняется только при загрузке страницы" },
    ],
    correctOptionId: "a",
    explanation:
      "Reflow (layout) пересчитывает расположение и размеры элементов. Repaint обновляет пиксели при изменении внешнего вида, не требующем нового layout.",
  },
  {
    id: "http-001",
    topicId: "http",
    type: "single-choice",
    prompt: "В чём главное различие между HTTP-статусами 401 и 403?",
    options: [
      { id: "a", text: "401 — сервер недоступен, 403 — запрос не найден" },
      {
        id: "b",
        text: "401 — не пройдена аутентификация, 403 — недостаточно прав доступа",
      },
      { id: "c", text: "401 — ошибка сервера, 403 — ошибка клиента" },
      { id: "d", text: "Оба статуса означают отсутствие ресурса" },
    ],
    correctOptionId: "b",
    explanation:
      "401 Unauthorized означает, что запрос не имеет действительных данных аутентификации. 403 Forbidden означает, что сервер понял запрос, но отказывает в доступе.",
  },
  {
    id: "http-002",
    topicId: "http",
    type: "single-choice",
    prompt: "Какой HTTP-метод по своей семантике является идемпотентным?",
    options: [
      { id: "a", text: "POST" },
      { id: "b", text: "PATCH всегда" },
      { id: "c", text: "PUT" },
      { id: "d", text: "Ни один из перечисленных" },
    ],
    correctOptionId: "c",
    explanation:
      "PUT идемпотентен: повторение одинакового запроса должно приводить к тому же итоговому состоянию ресурса. POST по умолчанию не идемпотентен, а PATCH не гарантирует идемпотентность.",
  },
  {
    id: "react-001",
    topicId: "react",
    type: "single-choice",
    prompt: "Для чего предназначен useRef в React?",
    options: [
      {
        id: "a",
        text: "Для хранения значения, изменение которого не вызывает повторный рендер",
      },
      {
        id: "b",
        text: "Для автоматического обновления компонента при каждом изменении",
      },
      { id: "c", text: "Для выполнения HTTP-запросов" },
      { id: "d", text: "Для создания глобального хранилища состояния" },
    ],
    correctOptionId: "a",
    explanation:
      "useRef возвращает стабильный объект с полем current. Его можно менять без запуска повторного рендера компонента. Также ref часто используют для доступа к DOM-элементам.",
  },
  {
    id: "react-002",
    topicId: "react",
    type: "single-choice",
    prompt: "Когда выполняется useEffect без массива зависимостей?",
    options: [
      { id: "a", text: "Только один раз после монтирования" },
      { id: "b", text: "После каждого рендера компонента" },
      { id: "c", text: "Только перед удалением компонента" },
      { id: "d", text: "Только при изменении props" },
    ],
    correctOptionId: "b",
    explanation:
      "Если второй аргумент useEffect не передан, эффект запускается после каждого commit компонента. При размонтировании выполняется cleanup, если он был возвращён.",
  },
];
