import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { formatRelative } from "@/lib/format";
import type { QuestionView } from "@/lib/types";
import { LikeButton } from "./LikeButton";

export function QuestionCard({ question }: { question: QuestionView }) {
  const category = getCategory(question.category);

  return (
    <Link
      href={`/questions/${question.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-paper-line bg-paper-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex items-center gap-2 text-xs text-ink-faint">
        <span className="rounded-full bg-paper px-2.5 py-1 font-medium text-ink-soft">
          {category?.emoji} {category?.label}
        </span>
        <span>
          {question.authorName} · {formatRelative(question.createdAt)}
        </span>
      </div>

      <h3 className="text-base font-semibold leading-snug group-hover:text-brand">
        {question.title}
      </h3>
      {question.body && <p className="line-clamp-2 text-sm text-ink-soft">{question.body}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <LikeButton
          questionId={question.id}
          initialCount={question.likeCount}
          initialLiked={question.likedByMe}
        />
        <span className="text-xs text-ink-faint">
          답변 {question.answerCount}
          {question.proposalCount > 0 && (
            <span className="ml-2 font-medium text-brand">제안 {question.proposalCount}</span>
          )}
        </span>
      </div>
    </Link>
  );
}
