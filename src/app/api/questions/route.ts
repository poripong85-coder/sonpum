import { NextResponse } from "next/server";
import { getCategory, getSort } from "@/lib/categories";
import { handleJson } from "@/lib/api";
import { createQuestion, listQuestions } from "@/lib/store";
import { getVisitorId } from "@/lib/visitor";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const questions = listQuestions({
    category: getCategory(params.get("category") ?? undefined)?.id,
    query: params.get("q") ?? undefined,
    sort: getSort(params.get("sort") ?? undefined),
    visitorId: await getVisitorId(),
  });
  return NextResponse.json({ questions });
}

export async function POST(request: Request) {
  return handleJson(request, (body) => ({ question: createQuestion(body) }));
}
