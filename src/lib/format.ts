const priceFormatter = new Intl.NumberFormat("ko-KR");

export function formatPrice(won: number): string {
  return won === 0 ? "무상 (출처 표기)" : `${priceFormatter.format(won)}원`;
}

export function formatRelative(iso: string, now: Date = new Date()): string {
  const diffSeconds = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 1000));

  if (diffSeconds < 60) return "방금";
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}일 전`;

  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}
