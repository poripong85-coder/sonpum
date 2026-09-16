"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDuration, formatPrice, formatSlot } from "@/lib/format";
import type { Experience } from "@/lib/types";

const MAX_HEADCOUNT = 8;

export function BookingPanel({ experience }: { experience: Experience }) {
  const router = useRouter();
  const openSlots = experience.slots.filter((slot) => slot.seatsLeft > 0);

  const [slotId, setSlotId] = useState(openSlots[0]?.id ?? "");
  const [headcount, setHeadcount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedSlot = experience.slots.find((slot) => slot.id === slotId);
  const maxSelectable = Math.min(MAX_HEADCOUNT, selectedSlot?.seatsLeft ?? MAX_HEADCOUNT);

  function selectSlot(nextSlotId: string, seatsLeft: number) {
    setSlotId(nextSlotId);
    setHeadcount((current) => Math.min(current, seatsLeft, MAX_HEADCOUNT));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceId: experience.id,
          slotId,
          guestName,
          guestPhone,
          headcount,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "예약에 실패했습니다.");
        return;
      }

      router.push("/reservations");
      router.refresh();
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  if (openSlots.length === 0) {
    return (
      <div className="rounded-2xl border border-paper-line bg-paper-card p-6">
        <p className="font-medium">지금은 예약할 수 있는 일정이 없습니다.</p>
        <p className="mt-1 text-sm text-ink-soft">다음 일정이 열리면 다시 찾아와 주세요.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-paper-line bg-paper-card p-6"
    >
      <div>
        <h2 className="text-sm font-semibold">일정 선택</h2>
        <div className="mt-3 flex flex-col gap-2">
          {experience.slots.map((slot) => {
            const soldOut = slot.seatsLeft === 0;
            const active = slot.id === slotId;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={soldOut}
                onClick={() => selectSlot(slot.id, slot.seatsLeft)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                  soldOut
                    ? "cursor-not-allowed border-paper-line bg-paper text-ink-faint"
                    : active
                      ? "border-brand bg-brand-soft"
                      : "border-paper-line hover:border-ink-faint"
                }`}
              >
                <span>
                  {formatSlot(slot.startsAt)}
                  <span className="ml-2 text-ink-faint">
                    {formatDuration(slot.durationMinutes)}
                  </span>
                </span>
                <span className={soldOut ? "" : "text-ink-soft"}>
                  {soldOut ? "마감" : `${slot.seatsLeft}석`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex flex-col gap-2 text-sm font-semibold">
        인원
        <select
          value={headcount}
          onChange={(event) => setHeadcount(Number(event.target.value))}
          className="rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 text-sm font-normal outline-none focus:border-ink-faint"
        >
          {Array.from({ length: maxSelectable }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count}명
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold">
        예약자 이름
        <input
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
          placeholder="홍길동"
          className="rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 text-sm font-normal outline-none placeholder:text-ink-faint focus:border-ink-faint"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-semibold">
        연락처
        <input
          value={guestPhone}
          onChange={(event) => setGuestPhone(event.target.value)}
          placeholder="010-1234-5678"
          inputMode="tel"
          className="rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 text-sm font-normal outline-none placeholder:text-ink-faint focus:border-ink-faint"
        />
      </label>

      <div className="flex items-baseline justify-between border-t border-paper-line pt-4">
        <span className="text-sm text-ink-soft">
          {formatPrice(experience.price)} × {headcount}명
        </span>
        <strong className="text-lg">{formatPrice(experience.price * headcount)}</strong>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-ink px-4 py-3 text-sm font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "예약하는 중…" : "예약하기"}
      </button>

      <p className="text-xs text-ink-faint">
        MVP 단계라 결제는 연결되어 있지 않습니다. 예약만 기록됩니다.
      </p>
    </form>
  );
}
