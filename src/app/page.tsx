import { BrowseControls } from "@/components/BrowseControls";
import { ExperienceCard } from "@/components/ExperienceCard";
import { filterExperiences, getCategory } from "@/lib/experiences";
import type { CategoryId } from "@/lib/types";

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { category, q } = await searchParams;
  const activeCategory = getCategory(category as CategoryId)?.id;
  const results = filterExperiences({ category: activeCategory, query: q });

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          사고 나면 물건이 아니라
          <br />
          하루가 남는 가게
        </h1>
        <p className="max-w-xl text-ink-soft">
          경험상점은 반나절이면 끝나지만 오래 기억에 남는 일들을 모읍니다. 마음에 드는 걸
          고르고, 일정을 정하고, 그날 그 자리에 가면 됩니다.
        </p>
      </section>

      <BrowseControls activeCategory={activeCategory} query={q} />

      <section>
        <p className="mb-4 text-sm text-ink-faint">{results.length}개의 경험</p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-paper-line px-6 py-16 text-center">
            <p className="font-medium">찾는 경험이 아직 없습니다.</p>
            <p className="mt-1 text-sm text-ink-soft">
              다른 검색어나 카테고리로 둘러보세요.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
