import { AskForm } from "@/components/AskForm";

export const metadata = { title: "질문하기 · 질문상점" };

export default function AskPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">무엇이 궁금한가요?</h1>
        <p className="text-ink-soft">
          사소해 보여도 괜찮아요. 같은 게 궁금한 사람이 많을수록, 그 질문은 누군가 만들 이유가 됩니다.
        </p>
      </div>
      <AskForm />
    </div>
  );
}
