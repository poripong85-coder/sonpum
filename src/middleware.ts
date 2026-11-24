import { NextResponse, type NextRequest } from "next/server";
import { VISITOR_COOKIE } from "@/lib/visitor-cookie";

/**
 * 첫 방문에 익명 방문자 id를 발급한다.
 * 같은 요청 안의 서버 컴포넌트도 읽을 수 있도록 요청 쿠키에도 넣어준다.
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has(VISITOR_COOKIE)) return NextResponse.next();

  const visitorId = crypto.randomUUID();
  request.cookies.set(VISITOR_COOKIE, visitorId);

  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
