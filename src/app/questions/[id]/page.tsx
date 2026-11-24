import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerForm } from "@/components/AnswerForm";
import { LikeButton } from "@/components/LikeButton";
import { ProposalForm } from "@/components/ProposalForm";
import { getCategory, proposalKindLabel } from "@/lib/categories";
import { formatPrice, formatRelative } from "@/lib/format";
import { getQuestion } from "@/lib/store";
import { getVisitorId } from "@/lib/visitor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const question = getQuestion(id);
  return { title: question ? `${question.title} · 질문상점` : "질문상점" };
}

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;
  const question = getQuestion(id, await getVisitorId());
  if (!question) notFound();

  const category = getCategory(question.category);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <article className="flex min-w-0 flex-col gap-8">
        <header className="flex flex-col gap-4">
          <Link href={`/?category=${question.category}`} className="text-sm text-ink-soft hover:text-ink">
            {category?.emoji} {category?.label}
          </Link>
          <h1 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {question.title}
          </h1>
          {question.body && <p className="whitespace-pre-line text-ink-soft">{question.body}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <LikeButton
              questionId={question.id}
              initialCount={question.likeCount}
              initialLiked={question.likedByMe}
              size="lg"
            />
            <span className="text-sm text-ink-faint">
              {question.authorName} · {formatRelative(question.createdAt)}
            </span>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            답변 <span className="text-ink-faint">{question.answerCount}</span>
          </h2>

          {question.answers.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-paper-line px-5 py-8 text-center text-sm text-ink-soft">
              아직 답이 없습니다. 첫 생각을 남겨 주세요.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {question.answers.map((answer) => (
                <li key={answer.id} className="rounded-2xl border border-paper-line bg-paper-card p-5">
                  <p className="whitespace-pre-line text-sm leading-relaxed">{answer.body}</p>
                  <p className="mt-3 text-xs text-ink-faint">
                    {answer.authorName} · {formatRelative(answer.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <AnswerForm questionId={question.id} />
        </section>
      </article>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
        <ProposalForm questionId={question.id} />

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">
            이 질문을 가져가려는 사람들 <span className="text-ink-faint">{question.proposalCount}</span>
          </h2>
          {question.proposals.length === 0 ? (
            <p className="text-sm text-ink-soft">아직 없습니다. 먼저 제안해 보세요.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {question.proposals.map((proposal) => (
                <li key={proposal.id} className="rounded-xl border border-paper-line bg-paper-card p-4 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{proposal.builderName}</span>
                    <span className="rounded-full bg-paper px-2 py-0.5 text-xs text-ink-soft">
                      {proposalKindLabel(proposal.kind)}
                    </span>
                  </div>
                  <p className="mt-2 text-ink-soft">{proposal.plan}</p>
                  <p className="mt-2 text-xs font-medium text-brand">{formatPrice(proposal.offer)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </div>
  );
}
