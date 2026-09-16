import Link from "next/link";
import { CATEGORIES } from "@/lib/experiences";

interface Props {
  activeCategory?: string;
  query?: string;
}

export function BrowseControls({ activeCategory, query }: Props) {
  const chip = (isActive: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition ${
      isActive
        ? "border-brand bg-brand text-white"
        : "border-paper-line bg-paper-card text-ink-soft hover:border-ink-faint"
    }`;

  const keep = (next: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.q) params.set("q", next.q);
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <div className="flex flex-col gap-4">
      <form action="/" className="flex gap-2">
        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        <input
          type="search"
          name="q"
          defaultValue={query ?? ""}
          placeholder="어떤 경험을 찾고 있나요?"
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
        <Link href={keep({ q: query })} className={chip(!activeCategory)}>
          전체
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={keep({ category: category.id, q: query })}
            className={chip(activeCategory === category.id)}
          >
            {category.emoji} {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
