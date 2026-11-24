import Link from "next/link";
import { BrowseControls } from "@/components/BrowseControls";
import { QuestionCard } from "@/components/QuestionCard";
import { getCategory, getSort } from "@/lib/categories";
import { listQuestions } from "@/lib/store";
import { getVisitorId } from "@/lib/visitor";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { category, q, sort: rawSort } = await searchParams;
  const activeCategory = getCategory(category)?.id;
  const sort = getSort(rawSort);
  const results = listQuestions({
    category: activeCategory,
    query: q,
    sort,
    visitorId: await getVisitorId(),
  });

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          좋은 질문은
          <br />
          누군가의 다음 일이 된다
        </h1>
        <p className="max-w-xl text-ink-soft">
          궁금한 걸 올리고, 같은 게 궁금했던 사람들은 &lsquo;나도 궁금해요&rsquo;를 누르고, 아는
          사람은 답을 답니다. 그 질문에서 콘텐츠나 사업을 시작하고 싶은 사람은 질문 작성자에게
          제안을 보낼 수 있어요.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/ask" className="rounded-xl bg-ink px-4 py-2.5 font-medium text-white hover:bg-ink/90">
            질문 올리기
          </Link>
          <Link
            href="/insights"
            className="rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 font-medium hover:border-ink-faint"
          >
            만들 거리 찾는 중이라면 →
          </Link>
        </div>
      </section>

      <BrowseControls activeCategory={activeCategory} query={q} sort={sort} />

      <section>
        <p className="mb-4 text-sm text-ink-faint">{results.length}개의 질문</p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-paper-line px-6 py-16 text-center">
            <p className="font-medium">아직 이런 질문은 없습니다.</p>
            <p className="mt-1 text-sm text-ink-soft">
              처음 묻는 사람이 되어 보세요.{" "}
              <Link href="/ask" className="text-brand hover:underline">
                질문하기 →
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
