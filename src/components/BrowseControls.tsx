import Link from "next/link";
import { CATEGORIES, SORTS } from "@/lib/categories";
import type { SortId } from "@/lib/types";

interface Props {
  activeCategory?: string;
  query?: string;
  sort: SortId;
}

const chip = (isActive: boolean) =>
  `rounded-full border px-3.5 py-1.5 text-sm transition ${
    isActive
      ? "border-brand bg-brand text-white"
      : "border-paper-line bg-paper-card text-ink-soft hover:border-ink-faint"
  }`;

export function BrowseControls({ activeCategory, query, sort }: Props) {
  const href = (next: { category?: string; q?: string; sort?: SortId }) => {
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.q) params.set("q", next.q);
    if (next.sort && next.sort !== "hot") params.set("sort", next.sort);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <div className="flex flex-col gap-4">
      <form action="/" className="flex gap-2">
        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        {sort !== "hot" && <input type="hidden" name="sort" value={sort} />}
        <input
          type="search"
          name="q"
          defaultValue={query ?? ""}
          placeholder="어떤 질문을 찾고 있나요?"
          className="w-full rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-ink-faint"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink/90"
        >
          찾기
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <Link href={href({ q: query, sort })} className={chip(!activeCategory)}>
          전체
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={href({ category: category.id, q: query, sort })}
            className={chip(activeCategory === category.id)}
          >
            {category.emoji} {category.label}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 border-b border-paper-line text-sm">
        {SORTS.map((option) => (
          <Link
            key={option.id}
            href={href({ category: activeCategory, q: query, sort: option.id })}
            className={`-mb-px border-b-2 pb-2 ${
              sort === option.id
                ? "border-ink font-semibold text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
