import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingPanel } from "@/components/BookingPanel";
import { getCategory, getExperience } from "@/lib/experiences";
import { formatPrice } from "@/lib/format";

interface Props {
  params: Promise<{ id: string }>;
}

// 잔여 좌석이 예약에 따라 바뀌므로 요청마다 렌더한다 (프리렌더하면 좌석 수가 굳는다).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const experience = getExperience(id);

  if (!experience) return { title: "경험상점" };

  return {
    title: `${experience.title} · 경험상점`,
    description: experience.tagline,
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { id } = await params;
  const experience = getExperience(id);

  if (!experience) notFound();

  const category = getCategory(experience.category);

  return (
    <div className="flex flex-col gap-8">
      <Link href="/" className="text-sm text-ink-soft hover:text-ink">
        ← 둘러보기로
      </Link>

      <div
        className={`h-56 rounded-2xl bg-gradient-to-br ${experience.gradient} sm:h-72`}
        aria-hidden
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <article className="flex flex-col gap-8">
          <header className="flex flex-col gap-3">
            <span className="text-sm text-ink-soft">
              {category?.emoji} {category?.label} · {experience.location}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">{experience.title}</h1>
            <p className="text-ink-soft">{experience.tagline}</p>
            <p className="text-sm text-ink-faint">
              ★ {experience.rating.toFixed(1)} · 후기 {experience.reviewCount}개 ·{" "}
              {formatPrice(experience.price)} / 1인
            </p>
          </header>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">이런 시간을 보냅니다</h2>
            <p className="whitespace-pre-line leading-relaxed text-ink-soft">
              {experience.description}
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">포함 사항</h2>
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              {experience.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="text-brand">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-paper-line bg-paper-card p-5">
            <h2 className="text-sm font-semibold">호스트 {experience.host.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {experience.host.intro}
            </p>
          </section>
        </article>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <BookingPanel experience={experience} />
        </aside>
      </div>
    </div>
  );
}
