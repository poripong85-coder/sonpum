import type { Question } from "./types";

/** 서버가 뜬 시점 기준으로 n시간 전 */
function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

type SeedQuestion = Omit<Question, "likedBy">;

const SEED: SeedQuestion[] = [
  {
    id: "q_lunch-alone",
    title: "회사 근처에서 혼밥하기 편한 곳을 왜 지도 앱은 못 찾아줄까?",
    body: "1인석이 있는지, 눈치 안 보이는지, 혼자 가도 2인분 안 시켜도 되는지. 리뷰에 다 흩어져 있는데 이걸 모아서 보여주는 곳이 없어요. 다들 어떻게 찾으세요?",
    category: "life",
    authorName: "점심유목민",
    createdAt: hoursAgo(5),
    baseLikes: 128,
    answers: [
      {
        id: "a_1",
        authorName: "판교3년차",
        body: "저는 인스타에서 '혼밥' 해시태그 + 동네 이름으로 찾아요. 근데 말씀처럼 정리된 데는 없어서 결국 단골 서너 곳만 돌게 되더라고요.",
        createdAt: hoursAgo(3),
      },
    ],
    proposals: [
      {
        id: "p_1",
        builderName: "로컬맵 스튜디오",
        kind: "startup",
        plan: "1인 손님 친화도를 태그로 모으는 지도 서비스 MVP를 만들어보려 합니다. 첫 화면 문구로 이 질문을 쓰고 싶어요.",
        offer: 50000,
        contact: "seed@example.com",
        createdAt: hoursAgo(2),
      },
    ],
  },
  {
    id: "q_side-project-quit",
    title: "사이드 프로젝트가 3주를 못 넘기는 건 의지 문제일까, 구조 문제일까?",
    body: "시작할 땐 신나는데 3주쯤 지나면 늘 멈춥니다. 저만 그런 게 아니라면, 끝까지 간 사람들은 뭐가 달랐는지 궁금해요.",
    category: "work",
    authorName: "작심삼주",
    createdAt: hoursAgo(26),
    baseLikes: 214,
    answers: [
      {
        id: "a_2",
        authorName: "출시3번",
        body: "저는 '누군가에게 보여줄 날짜'를 먼저 잡았을 때만 끝까지 갔어요. 혼자만 아는 마감은 마감이 아니더라고요.",
        createdAt: hoursAgo(20),
      },
      {
        id: "a_3",
        authorName: "익명의개발자",
        body: "범위를 처음 계획의 1/3로 잘라야 끝이 납니다. 3주 차에 지치는 건 남은 일이 처음보다 더 커 보여서예요.",
        createdAt: hoursAgo(12),
      },
    ],
    proposals: [
      {
        id: "p_2",
        builderName: "주간 메이커 레터",
        kind: "content",
        plan: "뉴스레터 한 회차 주제로 쓰고, 답변 주신 분들 인터뷰를 붙이고 싶습니다.",
        offer: 0,
        contact: "seed@example.com",
        createdAt: hoursAgo(8),
      },
    ],
  },
  {
    id: "q_subscription-audit",
    title: "내가 지금 매달 뭘 구독하고 있는지 한 번에 보는 방법 없나요?",
    body: "카드 명세서 뒤져보니 안 쓰는 구독이 4개나 있었어요. 카드사마다 따로 봐야 하고, 앱스토어 결제는 또 따로고. 이걸 한 화면에서 보고 해지까지 하고 싶어요.",
    category: "money",
    authorName: "새는돈",
    createdAt: hoursAgo(50),
    baseLikes: 342,
    answers: [],
    proposals: [],
  },
  {
    id: "q_parents-kiosk",
    title: "부모님이 키오스크 앞에서 당황하지 않게 미리 연습할 수 있는 게 있을까?",
    body: "패스트푸드점, 병원 접수, 무인 민원기. 실제 기계 앞에선 뒷사람 눈치가 보여서 더 못 하세요. 집에서 연습할 만한 앱이나 방법이 있는지 궁금합니다.",
    category: "society",
    authorName: "효도는기술",
    createdAt: hoursAgo(72),
    baseLikes: 187,
    answers: [
      {
        id: "a_4",
        authorName: "복지관선생님",
        body: "지역 복지관에서 키오스크 체험 교육을 하는 곳이 꽤 있어요. 다만 기종마다 화면이 달라서 실제 매장 화면이랑 똑같은 연습 도구가 있으면 훨씬 좋을 것 같아요.",
        createdAt: hoursAgo(60),
      },
    ],
    proposals: [],
  },
  {
    id: "q_ai-meeting-notes",
    title: "회의록 AI가 '누가 뭘 하기로 했는지'만 정확히 뽑아주면 안 되나?",
    body: "요약은 길고 정작 필요한 건 담당자와 기한이에요. 그것만 뽑아서 각자 할 일 목록에 넣어주는 도구가 있으면 바로 쓸 것 같은데, 왜 다들 요약에만 집중할까요?",
    category: "tech",
    authorName: "회의중독",
    createdAt: hoursAgo(9),
    baseLikes: 96,
    answers: [],
    proposals: [],
  },
  {
    id: "q_playlist-mood",
    title: "음악 추천이 내 '지금 기분'이 아니라 '지난주 기분'을 따라오는 느낌, 저만 그래요?",
    body: "어제 슬픈 노래 몇 곡 들었다고 일주일 내내 비슷한 곡만 나와요. 오늘 상태를 직접 알려줄 방법이 있으면 좋겠어요.",
    category: "culture",
    authorName: "셔플신봉자",
    createdAt: hoursAgo(30),
    baseLikes: 73,
    answers: [
      {
        id: "a_5",
        authorName: "플리장인",
        body: "저는 기분별로 시드 플레이리스트를 따로 만들어두고 거기서 '이 곡 기반 라디오'를 틀어요. 귀찮지만 제일 잘 먹힙니다.",
        createdAt: hoursAgo(28),
      },
    ],
    proposals: [],
  },
  {
    id: "q_rent-deposit",
    title: "전세 계약 전에 집주인이 위험한지 확인하는 체크리스트, 어디까지 봐야 충분한가요?",
    body: "등기부등본은 떼봤는데, 그다음에 뭘 더 봐야 하는지 사람마다 말이 달라요. 초보도 따라 할 수 있는 순서가 있으면 좋겠습니다.",
    category: "money",
    authorName: "첫독립",
    createdAt: hoursAgo(100),
    baseLikes: 265,
    answers: [],
    proposals: [],
  },
  {
    id: "q_hobby-friends",
    title: "서른 넘어서 새로운 친구는 어디서 사귀나요?",
    body: "학교도 아니고 회사 사람은 회사 사람이고. 취미 모임은 처음 가기가 너무 어렵습니다. 실제로 친구를 만든 분들 경로가 궁금해요.",
    category: "life",
    authorName: "새친구구함",
    createdAt: hoursAgo(14),
    baseLikes: 158,
    answers: [],
    proposals: [],
  },
];

export function buildSeed(): Question[] {
  return SEED.map((question) => ({ ...question, likedBy: new Set<string>() }));
}
