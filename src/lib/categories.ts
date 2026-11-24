import type { Category, CategoryId, ProposalKind, SortId } from "./types";

export const CATEGORIES: Category[] = [
  { id: "life", label: "일상", emoji: "🌱" },
  { id: "work", label: "일·커리어", emoji: "💼" },
  { id: "money", label: "돈·소비", emoji: "💸" },
  { id: "tech", label: "기술", emoji: "🛠️" },
  { id: "culture", label: "문화·취향", emoji: "🎧" },
  { id: "society", label: "사회", emoji: "🏙️" },
];

export function getCategory(id: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function isCategoryId(id: unknown): id is CategoryId {
  return typeof id === "string" && CATEGORIES.some((category) => category.id === id);
}

export const SORTS: { id: SortId; label: string }[] = [
  { id: "hot", label: "많이 궁금한" },
  { id: "new", label: "최신" },
  { id: "open", label: "아직 답이 없는" },
];

export function getSort(id: string | undefined): SortId {
  return SORTS.find((sort) => sort.id === id)?.id ?? "hot";
}

export const PROPOSAL_KINDS: { id: ProposalKind; label: string }[] = [
  { id: "content", label: "콘텐츠" },
  { id: "startup", label: "창업·제품" },
  { id: "research", label: "리서치" },
  { id: "other", label: "기타" },
];

export function proposalKindLabel(kind: ProposalKind): string {
  return PROPOSAL_KINDS.find((candidate) => candidate.id === kind)?.label ?? kind;
}
