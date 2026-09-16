# 경험상점

일상에 남는 경험을 고르고 예약하는 마켓플레이스. 현재 MVP 스캐폴드 단계입니다.

## 무엇이 동작하나

- **둘러보기** (`/`) — 경험 목록, 카테고리 필터, 키워드 검색
- **경험 상세** (`/experiences/[id]`) — 소개, 포함 사항, 호스트, 일정별 잔여 좌석
- **예약** — 일정·인원·예약자 정보를 입력하면 잔여 좌석이 차감되고 예약이 생성됩니다
- **예약 내역** (`/reservations`) — 생성된 예약 목록
- **API** — `GET/POST /api/reservations`

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

환경 변수는 `.env.example`를 `.env.local`로 복사해서 채웁니다. 현재 MVP는 외부 서비스
없이도 그대로 실행됩니다.

## 구조

```
src/
├── app/
│   ├── page.tsx                    둘러보기
│   ├── experiences/[id]/page.tsx   경험 상세
│   ├── reservations/page.tsx       예약 내역
│   └── api/reservations/route.ts   예약 API
├── components/                     UI 컴포넌트
└── lib/
    ├── types.ts                    도메인 타입
    ├── experiences.ts              경험 시드 데이터 + 조회/필터
    ├── reservations.ts             예약 저장소 + 검증
    └── format.ts                   가격·시간 포맷
```

## MVP의 한계

이 단계에서 의도적으로 생략한 것들입니다.

- **저장소가 메모리입니다.** 경험 데이터는 `src/lib/experiences.ts`에 하드코딩되어 있고,
  예약은 서버 프로세스 메모리에만 남습니다. 서버를 재시작하면 예약이 사라지고 좌석이
  초기화됩니다.
- **로그인이 없습니다.** 예약 내역 페이지는 모든 예약을 보여줍니다.
- **결제가 없습니다.** 금액은 계산만 하고 청구하지 않습니다.
- **이미지가 없습니다.** 사진 대신 경험별 그라데이션을 씁니다.

## 다음 단계

1. DB 연결 (예: Postgres + Prisma) — `experiences` / `reservations` 테이블로 이관
2. 인증 붙이고 예약 내역을 사용자별로 분리
3. 호스트용 경험 등록·일정 관리 화면
4. 결제 연동, 예약 취소·환불 정책
5. 사진 업로드와 이미지 최적화
