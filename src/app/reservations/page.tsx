import Link from "next/link";
import { getExperience } from "@/lib/experiences";
import { formatPrice, formatSlot } from "@/lib/format";
import { listReservations } from "@/lib/reservations";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "예약 내역 · 경험상점",
};

export default function ReservationsPage() {
  const reservations = listReservations();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">예약 내역</h1>
        <p className="text-sm text-ink-soft">
          MVP 단계라 예약은 서버 메모리에만 저장됩니다. 서버를 다시 시작하면 사라집니다.
        </p>
      </header>

      {reservations.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-paper-line px-6 py-16 text-center">
          <p className="font-medium">아직 예약한 경험이 없습니다.</p>
          <Link href="/" className="mt-2 inline-block text-sm text-brand hover:underline">
            경험 둘러보기 →
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {reservations.map((reservation) => {
            const experience = getExperience(reservation.experienceId);
            const slot = experience?.slots.find(
              (candidate) => candidate.id === reservation.slotId,
            );

            return (
              <li
                key={reservation.id}
                className="flex flex-col gap-2 rounded-2xl border border-paper-line bg-paper-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/experiences/${reservation.experienceId}`}
                    className="font-semibold hover:text-brand"
                  >
                    {experience?.title ?? reservation.experienceId}
                  </Link>
                  <span className="text-sm text-ink-soft">
                    {slot ? formatSlot(slot.startsAt) : "일정 정보 없음"} ·{" "}
                    {reservation.headcount}명
                  </span>
                  <span className="text-xs text-ink-faint">
                    {reservation.guestName} · {reservation.guestPhone}
                  </span>
                </div>
                <strong className="text-lg">{formatPrice(reservation.totalPrice)}</strong>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
