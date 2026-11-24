"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";
import { inputClass, labelClass, postJson, primaryButtonClass } from "./ui";

export function AskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<CategoryId | "">("");
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await postJson<{ question: { id: string } }>("/api/questions", {
      title,
      body,
      category,
      authorName,
    });

    if (!result.data) {
      setSubmitting(false);
      setError(result.error ?? "질문을 올리지 못했습니다.");
      return;
    }
    router.push(`/questions/${result.data.question.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-paper-line bg-paper-card p-6">
      <label className={labelClass}>
        질문
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 동네 세탁소는 왜 아직도 전화로만 예약받을까?"
          className={inputClass}
        />
        <span className="text-xs font-normal text-ink-faint">{title.trim().length}/120자</span>
      </label>

      <label className={labelClass}>
        조금 더 설명 (선택)
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder="왜 궁금해졌는지, 지금은 어떻게 해결하고 있는지 적어 주면 좋은 답이 더 잘 달립니다."
          className={inputClass}
        />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">카테고리</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setCategory(option.id)}
              aria-pressed={category === option.id}
              className={`rounded-full border px-3.5 py-1.5 text-sm ${
                category === option.id
                  ? "border-brand bg-brand text-white"
                  : "border-paper-line text-ink-soft hover:border-ink-faint"
              }`}
            >
              {option.emoji} {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className={labelClass}>
        이름 (선택)
        <input
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="비우면 익명으로 올라갑니다"
          className={inputClass}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className={primaryButtonClass}>
        {submitting ? "올리는 중…" : "질문 올리기"}
      </button>
    </form>
  );
}
