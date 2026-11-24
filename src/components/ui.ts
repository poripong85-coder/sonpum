/** 폼 공통 스타일 */
export const inputClass =
  "w-full rounded-xl border border-paper-line bg-paper-card px-4 py-2.5 text-sm font-normal outline-none placeholder:text-ink-faint focus:border-ink-faint";

export const labelClass = "flex flex-col gap-2 text-sm font-semibold";

export const primaryButtonClass =
  "rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50";

/** API에 JSON으로 POST하고 오류 메시지를 꺼내준다 */
export async function postJson<T>(url: string, body?: unknown): Promise<{ data?: T; error?: string }> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
    const payload = await response.json();
    if (!response.ok) return { error: payload.error ?? "요청에 실패했습니다." };
    return { data: payload as T };
  } catch {
    return { error: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
