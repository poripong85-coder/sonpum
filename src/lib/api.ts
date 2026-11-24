import { NextResponse } from "next/server";
import { ValidationError } from "./store";

/** JSON 본문을 읽고, 검증 오류는 400으로 돌려준다. */
export async function handleJson<T>(
  request: Request,
  run: (body: Record<string, unknown>) => T | Promise<T>,
  status = 201,
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  try {
    return NextResponse.json(await run(body as Record<string, unknown>), { status });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
