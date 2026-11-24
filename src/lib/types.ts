export type CategoryId = "life" | "work" | "money" | "tech" | "culture" | "society";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export type SortId = "hot" | "new" | "open";

/** 질문을 가져가려는 사람이 무엇을 만들려는지 */
export type ProposalKind = "content" | "startup" | "research" | "other";

export interface Answer {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

/**
 * 빌더(크리에이터·창업자)가 질문 작성자에게 보내는 "이 질문 쓰고 싶어요" 제안.
 * contact는 질문 작성자에게만 보여야 하는 값이라 공개 뷰에는 싣지 않는다.
 */
export interface Proposal {
  id: string;
  builderName: string;
  kind: ProposalKind;
  plan: string;
  /** 제안 금액 (원). 0이면 출처 표기 조건의 무상 사용 요청 */
  offer: number;
  contact: string;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  body: string;
  category: CategoryId;
  authorName: string;
  createdAt: string;
  /** 시드 데이터용 기본 궁금해요 수 */
  baseLikes: number;
  /** 궁금해요를 누른 방문자 id */
  likedBy: Set<string>;
  answers: Answer[];
  proposals: Proposal[];
}

export type PublicProposal = Omit<Proposal, "contact">;

/** 화면/API로 내보내는 질문 형태 */
export interface QuestionView {
  id: string;
  title: string;
  body: string;
  category: CategoryId;
  authorName: string;
  createdAt: string;
  likeCount: number;
  likedByMe: boolean;
  answerCount: number;
  proposalCount: number;
}

export interface QuestionDetail extends QuestionView {
  answers: Answer[];
  proposals: PublicProposal[];
}
