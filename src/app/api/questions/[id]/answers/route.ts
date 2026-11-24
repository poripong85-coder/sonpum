import { handleJson } from "@/lib/api";
import { addAnswer } from "@/lib/store";

interface Context {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  return handleJson(request, (body) => ({ answer: addAnswer(id, body) }));
}
