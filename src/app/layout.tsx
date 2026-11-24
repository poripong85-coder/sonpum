import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "질문상점",
  description: "궁금한 걸 올리면, 누군가는 그걸로 콘텐츠를 만들고 회사를 차린다",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans">
        <header className="border-b border-paper-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              질문상점
            </Link>
            <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-5">
              <Link href="/" className="hover:text-ink">
                둘러보기
              </Link>
              <Link href="/insights" className="hover:text-ink">
                빌더 인사이트
              </Link>
              <Link
                href="/ask"
                className="rounded-full bg-ink px-3.5 py-1.5 font-medium text-white hover:bg-ink/90"
              >
                질문하기
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>

        <footer className="mt-16 border-t border-paper-line">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-ink-faint">
            질문상점 · MVP 단계라 결제 없이 제안만 기록됩니다.
          </div>
        </footer>
      </body>
    </html>
  );
}
