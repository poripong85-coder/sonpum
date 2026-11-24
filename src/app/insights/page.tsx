import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { getInsights } from "@/lib/store";
import type { QuestionView } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "빌더 인사이트 · 질문상점" };

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-paper-line bg-paper-card p-4">
      <p className="text-xs text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value.toLocaleString("ko-KR")}</p>
    </div>
  );
}

function RankList({ items, empty }: { items: QuestionView[]; empty: string }) {
  if (items.length === 0) return <p className="text-sm text-ink-soft">{empty}</p>;

  return (
    <ol className="flex flex-col divide-y divide-paper-line rounded-2xl border border-paper-line bg-paper-card">
      {items.map((item, index) => (
        <li key={item.id}>
          <Link href={`/questions/${item.id}`} className="flex items-start gap-4 p-4 hover:bg-paper">
            <span className="w-5 shrink-0 text-sm font-semibold text-ink-faint tabular-nums">{index + 1}</span>
            <span className="min-w-0 flex-1 text-sm font-medium leading-snug">{item.title}</span>
            <span className="shrink-0 text-sm font-semibold text-brand tabular-nums">
              {item.likeCount}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function InsightsPage() {
  const insights = getInsights();
  const maxLikes = Math.max(1, ...insights.categories.map((entry) => entry.likes));

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">빌더 인사이트</h1>
        <p className="max-w-2xl text-ink-soft">
          콘텐츠를 만들거나 창업 아이템을 찾는 사람을 위한 화면입니다. &lsquo;나도 궁금해요&rsquo; 수는
          같은 걸 궁금해하는 사람의 수, 즉 수요의 신호입니다.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="질문" value={insights.totals.questions} />
        <Stat label="나도 궁금해요" value={insights.totals.likes} />
        <Stat label="답변" value={insights.totals.answers} />
        <Stat label="사용 제안" value={insights.totals.proposals} />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-semibold">아직 아무도 가져가지 않은 질문</h2>
            <p className="text-sm text-ink-soft">궁금한 사람은 많은데 사용 제안이 0건입니다.</p>
          </div>
          <RankList items={insights.untapped} empty="모든 질문에 제안이 들어와 있어요." />
        </section>

        <section className="flex flex-col gap-3">
          <div>
            <h2 className="font-semibold">답이 없는 질문</h2>
            <p className="text-sm text-ink-soft">기존 해법이 없다는 신호일 수 있습니다.</p>
          </div>
          <RankList items={insights.unanswered} empty="모든 질문에 답이 달려 있어요." />
        </section>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold">카테고리별 궁금해요</h2>
        <ul className="flex flex-col gap-2 rounded-2xl border border-paper-line bg-paper-card p-5">
          {insights.categories.map((entry) => {
            const category = getCategory(entry.category);
            return (
              <li key={entry.category} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 text-sm">
                <Link href={`/?category=${entry.category}`} className="truncate hover:text-brand">
                  {category?.emoji} {category?.label}
                </Link>
                <span className="h-2 overflow-hidden rounded-full bg-paper">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${(entry.likes / maxLikes) * 100}%` }}
                  />
                </span>
                <span className="text-ink-soft tabular-nums">
                  {entry.likes} · 질문 {entry.questions}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
