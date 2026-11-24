import { NextResponse } from "next/server";
import { toggleLike, ValidationError } from "@/lib/store";
import { getVisitorId } from "@/lib/visitor";

interface Context {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: Context) {
  const { id } = await params;
  const visitorId = await getVisitorId();
  if (!visitorId) {
    return NextResponse.json({ error: "쿠키를 허용해야 궁금해요를 누를 수 있습니다." }, { status: 400 });
  }

  try {
    return NextResponse.json(toggleLike(id, visitorId));
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    throw error;
  }
}
