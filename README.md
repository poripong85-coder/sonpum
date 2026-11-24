# 질문상점

질문과 생각을 공유하고, 그 질문을 콘텐츠·창업의 출발점으로 가져가는 마켓플레이스. 현재 MVP 단계입니다.

## 누가 쓰나

- **묻고 답하는 사람** — 궁금한 걸 올리고, 같은 게 궁금하면 '나도 궁금해요'를 누르고, 아는 걸 답합니다.
- **빌더** (크리에이터·창업자·리서처) — 많은 사람이 궁금해하는 질문을 찾아, 질문 작성자에게
  "이 질문으로 무언가 만들고 싶다"는 **사용 제안**을 보냅니다. 금액을 걸거나, 출처 표기만 약속할 수 있습니다.

'나도 궁금해요' 수가 곧 수요 신호이고, 사용 제안이 질문의 '판매'에 해당합니다.

## 무엇이 동작하나

- **둘러보기** (`/`) — 질문 목록, 카테고리 필터, 검색, 정렬(많이 궁금한 / 최신 / 아직 답이 없는)
- **질문하기** (`/ask`)
- **질문 상세** (`/questions/[id]`) — 나도 궁금해요, 답변 달기, 사용 제안 보내기, 받은 제안 목록
- **빌더 인사이트** (`/insights`) — 제안이 아직 없는 인기 질문, 답이 없는 인기 질문, 카테고리별 수요
- **API**
  - `GET/POST /api/questions`
  - `POST /api/questions/[id]/like` — 토글, 방문자당 1회
  - `POST /api/questions/[id]/answers`
  - `POST /api/questions/[id]/proposals` — 제안자 이메일은 저장만 하고 공개 응답에는 넣지 않습니다

## 기술 스택

- Next.js 15 (App Router) / React 19
- TypeScript (strict)
- Tailwind CSS 3

## 시작하기

```bash
npm install
npm run dev     # http://localhost:3000
```

기타 명령:

```bash
npm run build      # 프로덕션 빌드
npm run typecheck  # 타입 검사
npm run lint       # 린트
```

## 구조

```
src/
├── middleware.ts                       익명 방문자 쿠키 발급
├── app/
│   ├── page.tsx                        둘러보기
│   ├── ask/page.tsx                    질문하기
│   ├── questions/[id]/page.tsx         질문 상세
│   ├── insights/page.tsx               빌더 인사이트
│   └── api/questions/...               API
├── components/                         UI 컴포넌트
└── lib/
    ├── types.ts                        도메인 타입
    ├── categories.ts                   카테고리·정렬·제안 종류
    ├── seed.ts                         시드 질문
    ├── store.ts                        저장소 + 검증
    └── format.ts                       가격·시간 포맷
```

## MVP의 한계

- **저장소가 메모리입니다.** 서버를 재시작하면 시드 상태로 돌아갑니다.
- **로그인이 없습니다.** '나도 궁금해요' 중복은 익명 쿠키로만 막습니다(쿠키를 지우면 다시 누를 수 있음).
  질문 작성자가 받은 제안의 연락처를 볼 화면도 아직 없습니다.
- **결제가 없습니다.** 제안 금액은 기록만 합니다.
- **신고·모더레이션이 없습니다.**

## 다음 단계

1. DB 연결 (예: Postgres + Prisma) — `questions` / `likes` / `answers` / `proposals`
2. 로그인 → 내 질문함에서 받은 제안 확인·수락/거절, 연락처 공개는 수락 시에만
3. 결제·정산 (제안 수락 시 에스크로, 수수료 모델)
4. 답변 추천/채택, 질문 팔로우·알림
5. 빌더용 구독 플랜 (트렌드 리포트, 키워드 알림)
6. 신고·스팸 방지
