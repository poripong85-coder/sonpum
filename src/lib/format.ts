const KRW = new Intl.NumberFormat("ko-KR");

export function formatPrice(won: number): string {
  return `${KRW.format(won)}원`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}분`;
  if (rest === 0) return `${hours}시간`;
  return `${hours}시간 ${rest}분`;
}

/**
 * 시드 데이터의 시각은 KST 기준으로 작성되어 있다.
 * 서버/브라우저 타임존과 무관하게 같은 문자열이 나오도록 타임존을 고정한다.
 *
 * 오전/오후 표기는 직접 조립한다. Intl의 hour12 출력이 런타임 ICU 빌드에 따라
 * "오전"이 되기도 "AM"이 되기도 해서, 서버 렌더와 클라이언트 렌더가 어긋날 수 있다.
 */
const SLOT_PARTS = new Intl.DateTimeFormat("ko-KR", {
  month: "numeric",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Seoul",
});

export function formatSlot(startsAt: string): string {
  const parts = new Map(
    SLOT_PARTS.formatToParts(new Date(startsAt)).map((part) => [part.type, part.value]),
  );

  const month = Number(parts.get("month"));
  const day = Number(parts.get("day"));
  const weekday = parts.get("weekday") ?? "";
  const hour24 = Number(parts.get("hour"));
  const minute = parts.get("minute") ?? "00";

  const period = hour24 < 12 ? "오전" : "오후";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

  return `${month}월 ${day}일 (${weekday}) ${period} ${hour12}:${minute}`;
}
