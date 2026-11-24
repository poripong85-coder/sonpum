"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inputClass, postJson, primaryButtonClass } from "./ui";

export function AnswerForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [authorName, setAuthorName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await postJson(`/api/questions/${questionId}/answers`, { authorName, body });
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setBody("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl border border-paper-line bg-paper-card p-5">
      <h3 className="text-sm font-semibold">내 생각 남기기</h3>
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        rows={4}
        placeholder="경험이나 생각, 알고 있는 방법을 적어 주세요."
        className={inputClass}
      />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
          placeholder="이름 (비우면 익명)"
          className={inputClass}
        />
        <button type="submit" disabled={submitting} className={`${primaryButtonClass} shrink-0`}>
          {submitting ? "올리는 중…" : "답변 달기"}
        </button>
      </div>
      {error && (
        <p role="alert" className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">
          {error}
        </p>
      )}
    </form>
  );
}
