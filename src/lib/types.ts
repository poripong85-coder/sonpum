export type CategoryId =
  | "cooking"
  | "craft"
  | "nature"
  | "sound"
  | "wellness";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
}

export interface TimeSlot {
  /** 슬롯 식별자 (경험 내에서 유일) */
  id: string;
  /** ISO 8601 날짜시간 (KST 기준으로 작성) */
  startsAt: string;
  /** 진행 시간(분) */
  durationMinutes: number;
  /** 남은 자리 */
  seatsLeft: number;
}

export interface Host {
  name: string;
  intro: string;
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  category: CategoryId;
  /** 1인당 가격 (원) */
  price: number;
  location: string;
  /** 카드/상세 배경에 쓰는 그라데이션 (이미지 대체용 플레이스홀더) */
  gradient: string;
  description: string;
  /** 준비물 · 포함 사항 */
  includes: string[];
  host: Host;
  slots: TimeSlot[];
  rating: number;
  reviewCount: number;
}

export interface Reservation {
  id: string;
  experienceId: string;
  slotId: string;
  guestName: string;
  guestPhone: string;
  headcount: number;
  /** 결제 예정 총액 (원) */
  totalPrice: number;
  createdAt: string;
}

export interface ReservationInput {
  experienceId: string;
  slotId: string;
  guestName: string;
  guestPhone: string;
  headcount: number;
}
