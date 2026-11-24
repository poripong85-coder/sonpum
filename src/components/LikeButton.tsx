"use client";

import { useState } from "react";
import { postJson } from "./ui";

interface Props {
  questionId: string;
  initialCount: number;
  initialLiked: boolean;
  size?: "sm" | "lg";
}

export function LikeButton({ questionId, initialCount, initialLiked, size = "sm" }: Props) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [pending, setPending] = useState(false);

  async function toggle(event: React.MouseEvent) {
    // 카드 전체가 링크라서 클릭이 상세 페이지 이동으로 번지지 않게 막는다
    event.preventDefault();
    event.stopPropagation();
    if (pending) return;

    setPending(true);
    setLiked(!liked);
    setCount(count + (liked ? -1 : 1));

    const { data } = await postJson<{ likeCount: number; likedByMe: boolean }>(
      `/api/questions/${questionId}/like`,
    );
    if (data) {
      setCount(data.likeCount);
      setLiked(data.likedByMe);
    } else {
      setLiked(liked);
      setCount(count);
    }
    setPending(false);
  }

  const sizing = size === "lg" ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border font-medium transition ${sizing} ${
        liked
          ? "border-brand bg-brand text-white"
          : "border-paper-line bg-paper-card text-ink-soft hover:border-brand hover:text-brand"
      }`}
    >
      <span aria-hidden>?</span>
      나도 궁금해요 <span className="tabular-nums">{count}</span>
    </button>
  );
}
