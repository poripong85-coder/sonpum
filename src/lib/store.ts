import { isCategoryId } from "./categories";
import { buildSeed } from "./seed";
import type {
  Answer,
  CategoryId,
  Proposal,
  ProposalKind,
  PublicProposal,
  Question,
  QuestionDetail,
  QuestionView,
  SortId,
} from "./types";

/**
 * MVP 저장소: 프로세스 메모리에만 남는다. 서버를 재시작하면 시드 상태로 돌아간다.
 * 개발 중 모듈이 다시 로드돼도 초기화되지 않도록 globalThis에 붙여둔다.
 */
const holder = globalThis as unknown as { __questions?: Question[] };
holder.__questions ??= buildSeed();
const questions = holder.__questions;

export class ValidationError extends Error {}

export const LIMITS = {
  title: { min: 8, max: 120 },
  body: { max: 2000 },
  name: { max: 30 },
  answer: { min: 5, max: 3000 },
  plan: { min: 10, max: 1000 },
  offerMax: 100_000_000,
} as const;

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function cleanName(value: unknown, fallback: string): string {
  const name = typeof value === "string" ? value.trim() : "";
  if (name.length > LIMITS.name.max) {
    throw new ValidationError(`이름은 ${LIMITS.name.max}자 이내로 적어 주세요.`);
  }
  return name || fallback;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function likeCount(question: Question): number {
  return question.baseLikes + question.likedBy.size;
}

function toView(question: Question, visitorId?: string): QuestionView {
  return {
    id: question.id,
    title: question.title,
    body: question.body,
    category: question.category,
    authorName: question.authorName,
    createdAt: question.createdAt,
    likeCount: likeCount(question),
    likedByMe: visitorId ? question.likedBy.has(visitorId) : false,
    answerCount: question.answers.length,
    proposalCount: question.proposals.length,
  };
}

/** 연락처는 질문 작성자에게만 보여야 하므로 공개 응답에서 뺀다 */
function toPublic(proposal: Proposal): PublicProposal {
  const { contact, ...rest } = proposal;
  void contact;
  return rest;
}

function find(id: string): Question {
  const question = questions.find((candidate) => candidate.id === id);
  if (!question) throw new ValidationError("존재하지 않는 질문입니다.");
  return question;
}

// ── 조회 ────────────────────────────────────────────────

export function listQuestions(options: {
  category?: CategoryId;
  query?: string;
  sort?: SortId;
  visitorId?: string;
}): QuestionView[] {
  const query = options.query?.trim().toLowerCase();

  let result = questions.filter((question) => {
    if (options.category && question.category !== options.category) return false;
    if (options.sort === "open" && question.answers.length > 0) return false;
    if (!query) return true;
    return `${question.title} ${question.body}`.toLowerCase().includes(query);
  });

  result = [...result].sort((a, b) =>
    options.sort === "new"
      ? b.createdAt.localeCompare(a.createdAt)
      : likeCount(b) - likeCount(a),
  );

  return result.map((question) => toView(question, options.visitorId));
}

export function getQuestion(id: string, visitorId?: string): QuestionDetail | undefined {
  const question = questions.find((candidate) => candidate.id === id);
  if (!question) return undefined;

  return {
    ...toView(question, visitorId),
    answers: [...question.answers].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    proposals: [...question.proposals]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map(toPublic),
  };
}

/** 빌더용: 수요 신호 요약 */
export function getInsights() {
  const views = questions.map((question) => toView(question));
  const byLikes = [...views].sort((a, b) => b.likeCount - a.likeCount);

  const categoryTotals = new Map<CategoryId, { questions: number; likes: number }>();
  for (const view of views) {
    const entry = categoryTotals.get(view.category) ?? { questions: 0, likes: 0 };
    entry.questions += 1;
    entry.likes += view.likeCount;
    categoryTotals.set(view.category, entry);
  }

  return {
    totals: {
      questions: views.length,
      likes: views.reduce((sum, view) => sum + view.likeCount, 0),
      answers: views.reduce((sum, view) => sum + view.answerCount, 0),
      proposals: views.reduce((sum, view) => sum + view.proposalCount, 0),
    },
    /** 궁금한 사람은 많은데 아직 아무도 가져가지 않은 질문 */
    untapped: byLikes.filter((view) => view.proposalCount === 0).slice(0, 5),
    /** 답이 없는데 궁금한 사람이 많은 질문 */
    unanswered: byLikes.filter((view) => view.answerCount === 0).slice(0, 5),
    categories: [...categoryTotals.entries()]
      .map(([category, entry]) => ({ category, ...entry }))
      .sort((a, b) => b.likes - a.likes),
  };
}

// ── 쓰기 ────────────────────────────────────────────────

export function createQuestion(input: {
  title?: unknown;
  body?: unknown;
  category?: unknown;
  authorName?: unknown;
}): QuestionView {
  const title = text(input.title);
  const body = text(input.body);

  if (title.length < LIMITS.title.min || title.length > LIMITS.title.max) {
    throw new ValidationError(
      `질문은 ${LIMITS.title.min}자 이상 ${LIMITS.title.max}자 이하로 적어 주세요.`,
    );
  }
  if (body.length > LIMITS.body.max) {
    throw new ValidationError(`설명은 ${LIMITS.body.max}자 이내로 적어 주세요.`);
  }
  if (!isCategoryId(input.category)) {
    throw new ValidationError("카테고리를 골라 주세요.");
  }

  const question: Question = {
    id: newId("q"),
    title,
    body,
    category: input.category,
    authorName: cleanName(input.authorName, "익명"),
    createdAt: new Date().toISOString(),
    baseLikes: 0,
    likedBy: new Set(),
    answers: [],
    proposals: [],
  };

  questions.push(question);
  return toView(question);
}

/** 궁금해요 토글. 방문자당 한 번만 센다. */
export function toggleLike(questionId: string, visitorId: string) {
  const question = find(questionId);

  if (question.likedBy.has(visitorId)) {
    question.likedBy.delete(visitorId);
  } else {
    question.likedBy.add(visitorId);
  }

  return { likeCount: likeCount(question), likedByMe: question.likedBy.has(visitorId) };
}

export function addAnswer(
  questionId: string,
  input: { authorName?: unknown; body?: unknown },
): Answer {
  const question = find(questionId);
  const body = text(input.body);

  if (body.length < LIMITS.answer.min || body.length > LIMITS.answer.max) {
    throw new ValidationError(
      `답변은 ${LIMITS.answer.min}자 이상 ${LIMITS.answer.max}자 이하로 적어 주세요.`,
    );
  }

  const answer: Answer = {
    id: newId("a"),
    authorName: cleanName(input.authorName, "익명"),
    body,
    createdAt: new Date().toISOString(),
  };

  question.answers.push(answer);
  return answer;
}

const KINDS: ProposalKind[] = ["content", "startup", "research", "other"];

export function addProposal(
  questionId: string,
  input: {
    builderName?: unknown;
    kind?: unknown;
    plan?: unknown;
    offer?: unknown;
    contact?: unknown;
  },
): PublicProposal {
  const question = find(questionId);
  const builderName = text(input.builderName);
  const plan = text(input.plan);
  const contact = text(input.contact);
  const offer = Number(input.offer ?? 0);

  if (!builderName) throw new ValidationError("이름이나 팀 이름을 적어 주세요.");
  cleanName(builderName, "");
  if (!KINDS.includes(input.kind as ProposalKind)) {
    throw new ValidationError("무엇을 만들지 골라 주세요.");
  }
  if (plan.length < LIMITS.plan.min || plan.length > LIMITS.plan.max) {
    throw new ValidationError(
      `계획은 ${LIMITS.plan.min}자 이상 ${LIMITS.plan.max}자 이하로 적어 주세요.`,
    );
  }
  if (!Number.isInteger(offer) || offer < 0 || offer > LIMITS.offerMax) {
    throw new ValidationError("제안 금액은 0원 이상의 정수로 적어 주세요.");
  }
  if (!/^\S+@\S+\.\S+$/.test(contact)) {
    throw new ValidationError("질문 작성자가 연락할 이메일을 적어 주세요.");
  }

  const proposal: Proposal = {
    id: newId("p"),
    builderName,
    kind: input.kind as ProposalKind,
    plan,
    offer,
    contact,
    createdAt: new Date().toISOString(),
  };

  question.proposals.push(proposal);
  return toPublic(proposal);
}
