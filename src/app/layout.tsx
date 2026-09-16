import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "경험상점",
  description: "일상에 남는 경험을 고르고 예약하는 곳",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans">
        <header className="border-b border-paper-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              경험상점
            </Link>
            <nav className="flex items-center gap-5 text-sm text-ink-soft">
              <Link href="/" className="hover:text-ink">
                둘러보기
              </Link>
              <Link href="/reservations" className="hover:text-ink">
                예약 내역
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>

        <footer className="mt-16 border-t border-paper-line">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-ink-faint">
            경험상점 · 아직 아무것도 팔지 않는 MVP입니다.
          </div>
        </footer>
      </body>
    </html>
  );
}
