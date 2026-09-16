import { getExperience } from "./experiences";
import type { Reservation, ReservationInput } from "./types";

/**
 * MVP 저장소: 프로세스 메모리에만 남는다. 서버를 재시작하면 사라진다.
 * 개발 중 모듈이 다시 로드돼도 목록이 초기화되지 않도록 globalThis에 붙여둔다.
 * (DB 연동은 다음 단계 — README의 "다음 단계" 참고)
 */
const store = globalThis as unknown as { __reservations?: Reservation[] };
store.__reservations ??= [];

const reservations = store.__reservations;

export const MAX_HEADCOUNT = 8;

export class ReservationError extends Error {}

export function listReservations(): Reservation[] {
  return [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createReservation(input: ReservationInput): Reservation {
  const guestName = input.guestName?.trim() ?? "";
  const guestPhone = input.guestPhone?.trim() ?? "";
  const headcount = Number(input.headcount);

  if (!guestName) {
    throw new ReservationError("예약자 이름을 입력해 주세요.");
  }
  if (!/^[0-9-]{9,13}$/.test(guestPhone)) {
    throw new ReservationError("연락처를 숫자와 하이픈으로 입력해 주세요.");
  }
  if (!Number.isInteger(headcount) || headcount < 1 || headcount > MAX_HEADCOUNT) {
    throw new ReservationError(`인원은 1명부터 ${MAX_HEADCOUNT}명까지 선택할 수 있습니다.`);
  }

  const experience = getExperience(input.experienceId);
  if (!experience) {
    throw new ReservationError("존재하지 않는 경험입니다.");
  }

  const slot = experience.slots.find((candidate) => candidate.id === input.slotId);
  if (!slot) {
    throw new ReservationError("일정을 선택해 주세요.");
  }
  if (slot.seatsLeft < headcount) {
    throw new ReservationError(
      slot.seatsLeft === 0
        ? "이미 마감된 일정입니다."
        : `남은 자리가 ${slot.seatsLeft}석입니다.`,
    );
  }

  slot.seatsLeft -= headcount;

  const reservation: Reservation = {
    id: `rsv_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    experienceId: experience.id,
    slotId: slot.id,
    guestName,
    guestPhone,
    headcount,
    totalPrice: experience.price * headcount,
    createdAt: new Date().toISOString(),
  };

  reservations.push(reservation);
  return reservation;
}
