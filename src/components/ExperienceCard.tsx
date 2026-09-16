import Link from "next/link";
import { getCategory } from "@/lib/experiences";
import { formatPrice } from "@/lib/format";
import type { Experience } from "@/lib/types";

export function ExperienceCard({ experience }: { experience: Experience }) {
  const category = getCategory(experience.category);
  const openSeats = experience.slots.reduce((sum, slot) => sum + slot.seatsLeft, 0);

  return (
    <Link
      href={`/experiences/${experience.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-paper-line bg-paper-card transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <div
        className={`h-40 bg-gradient-to-br ${experience.gradient} flex items-end p-4`}
        aria-hidden
      >
        <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-ink">
          {category?.emoji} {category?.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold leading-snug group-hover:text-brand">
          {experience.title}
        </h3>
        <p className="text-sm text-ink-soft">{experience.tagline}</p>

        <div className="mt-auto flex items-baseline justify-between pt-3">
          <span className="text-sm font-semibold">{formatPrice(experience.price)}</span>
          <span className="text-xs text-ink-faint">
            {experience.location} · ★ {experience.rating.toFixed(1)}
          </span>
        </div>

        {openSeats === 0 && (
          <span className="text-xs font-medium text-brand">모든 일정 마감</span>
        )}
      </div>
    </Link>
  );
}
