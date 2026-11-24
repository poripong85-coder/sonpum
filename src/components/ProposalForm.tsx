"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROPOSAL_KINDS } from "@/lib/categories";
import type { ProposalKind } from "@/lib/types";
import { inputClass, labelClass, postJson, primaryButtonClass } from "./ui";

export function ProposalForm({ questionId }: { questionId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [builderName, setBuilderName] = useState("");
  const [kind, setKind] = useState<ProposalKind>("content");
  const [plan, setPlan] = useState("");
  const [offer, setOffer] = useState("0");
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await postJson(`/api/questions/${questionId}/proposals`, {
      builderName,
      kind,
      plan,
      offer: Number(offer || 0),
      contact,
    });
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setSent(true);
    setOpen(false);
    setPlan("");
    router.refresh();
  }

  if (!open) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-brand/30 bg-brand-soft p-5">
        <p className="text-sm font-semibold">이 질문으로 뭔가 만들고 싶다면</p>
        <p className="text-sm text-ink-soft">
          콘텐츠, 제품, 리서치의 출발점으로 쓰고 싶다고 질문 작성자에게 제안하세요. 금액을 걸
          수도, 출처 표기만 약속할 수도 있어요.
        </p>
        {sent && <p className="text-sm font-medium text-brand">제안을 보냈어요.</p>}
        <button type="button" onClick={() => setOpen(true)} className={primaryButtonClass}>
          사용 제안 보내기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-brand/30 bg-paper-card p-5"
    >
      <p className="text-sm font-semibold">사용 제안</p>

      <label className={labelClass}>
        이름 또는 팀
        <input value={builderName} onChange={(e) => setBuilderName(e.target.value)} className={inputClass} />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">무엇을 만들 건가요</legend>
        <div className="flex flex-wrap gap-2">
          {PROPOSAL_KINDS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setKind(option.id)}
              aria-pressed={kind === option.id}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                kind === option.id
                  ? "border-brand bg-brand text-white"
                  : "border-paper-line text-ink-soft hover:border-ink-faint"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className={labelClass}>
        계획
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          rows={3}
          placeholder="이 질문을 어떻게 쓰려는지 짧게 적어 주세요."
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        제안 금액 (원)
        <input
          value={offer}
          onChange={(e) => setOffer(e.target.value.replace(/[^0-9]/g, ""))}
          inputMode="numeric"
          className={inputClass}
        />
        <span className="text-xs font-normal text-ink-faint">0원이면 출처 표기 조건의 무상 사용 요청입니다.</span>
      </label>

      <label className={labelClass}>
        연락받을 이메일
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="email"
          placeholder="질문 작성자에게만 보입니다"
          className={inputClass}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className={`${primaryButtonClass} flex-1`}>
          {submitting ? "보내는 중…" : "제안 보내기"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-paper-line px-4 py-2.5 text-sm text-ink-soft hover:border-ink-faint"
        >
          취소
        </button>
      </div>
      <p className="text-xs text-ink-faint">MVP 단계라 결제는 연결되어 있지 않습니다. 제안만 기록됩니다.</p>
    </form>
  );
}
