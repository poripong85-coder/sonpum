import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-semibold">찾는 페이지가 없습니다</h1>
      <p className="text-ink-soft">주소가 바뀌었거나 사라진 질문일 수 있습니다.</p>
      <Link href="/" className="mt-2 text-sm text-brand hover:underline">
        둘러보기로 돌아가기 →
      </Link>
    </div>
  );
}
