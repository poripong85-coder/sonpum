import type { Category, CategoryId, Experience } from "./types";

export const CATEGORIES: Category[] = [
  { id: "cooking", label: "요리", emoji: "🍳" },
  { id: "craft", label: "공예", emoji: "🪡" },
  { id: "nature", label: "자연", emoji: "🌿" },
  { id: "sound", label: "소리", emoji: "🎧" },
  { id: "wellness", label: "회복", emoji: "🌙" },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "morning-bread",
    title: "새벽 다섯 시의 빵",
    tagline: "문 열기 전 빵집에서 반죽부터 굽기까지",
    category: "cooking",
    price: 68000,
    location: "서울 성수동",
    gradient: "from-amber-200 via-orange-200 to-rose-200",
    description:
      "동네 빵집이 손님을 받기 전, 가장 조용한 두 시간을 함께 보냅니다. 전날 저녁에 미리 잡아둔 반죽을 만지고, 발효 상태를 손끝으로 읽고, 오븐 앞에서 굽는 타이밍을 배웁니다. 갓 구운 빵과 커피로 아침을 먹고 헤어집니다.",
    includes: ["앞치마와 재료 일체", "직접 구운 빵 2덩이 포장", "아침 식사와 커피"],
    host: {
      name: "김도윤",
      intro: "성수동에서 7년째 작은 빵집을 운영합니다. 새벽 공기를 좋아합니다.",
    },
    slots: [
      { id: "mb-1", startsAt: "2026-10-04T05:00:00+09:00", durationMinutes: 150, seatsLeft: 3 },
      { id: "mb-2", startsAt: "2026-10-11T05:00:00+09:00", durationMinutes: 150, seatsLeft: 6 },
      { id: "mb-3", startsAt: "2026-10-18T05:00:00+09:00", durationMinutes: 150, seatsLeft: 0 },
    ],
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "clay-bowl",
    title: "밥그릇 하나 만들기",
    tagline: "매일 쓰는 그릇을 내 손으로",
    category: "craft",
    price: 55000,
    location: "경기 파주 헤이리",
    gradient: "from-stone-200 via-amber-100 to-emerald-100",
    description:
      "물레 없이 손으로만 빚는 세 시간입니다. 화려한 작품 대신 매일 밥을 담을 그릇 하나를 목표로 합니다. 유약을 고르고 굽는 과정은 공방에서 마무리해 3주 뒤 집으로 보내드립니다.",
    includes: ["점토와 도구", "소성·유약 작업", "완성품 택배 발송"],
    host: {
      name: "이서진",
      intro: "생활 도자를 만듭니다. 잘 만든 것보다 자주 쓰는 것을 좋아합니다.",
    },
    slots: [
      { id: "cb-1", startsAt: "2026-10-05T14:00:00+09:00", durationMinutes: 180, seatsLeft: 4 },
      { id: "cb-2", startsAt: "2026-10-12T14:00:00+09:00", durationMinutes: 180, seatsLeft: 2 },
    ],
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "night-forest",
    title: "밤의 숲 걷기",
    tagline: "불빛 없이 두 시간, 눈이 어둠에 익는 경험",
    category: "nature",
    price: 42000,
    location: "강원 평창",
    gradient: "from-slate-300 via-indigo-200 to-emerald-200",
    description:
      "해가 완전히 진 뒤 숲길을 걷습니다. 손전등은 처음 10분만 씁니다. 눈이 어둠에 적응하면 생각보다 많은 것이 보인다는 걸 확인하는 시간입니다. 중간에 멈춰 소리만 듣는 구간이 있습니다.",
    includes: ["안전 장비와 보온 담요", "가이드 동행", "따뜻한 차"],
    host: {
      name: "박하늘",
      intro: "산림 해설가. 밤 산행 안전 교육 이수자입니다.",
    },
    slots: [
      { id: "nf-1", startsAt: "2026-10-09T19:30:00+09:00", durationMinutes: 120, seatsLeft: 8 },
      { id: "nf-2", startsAt: "2026-10-23T19:30:00+09:00", durationMinutes: 120, seatsLeft: 8 },
    ],
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "city-sound",
    title: "도시의 소리 채집",
    tagline: "녹음기를 들고 동네를 다시 듣기",
    category: "sound",
    price: 49000,
    location: "서울 을지로",
    gradient: "from-sky-200 via-cyan-100 to-slate-200",
    description:
      "휴대용 녹음기를 하나씩 들고 을지로 골목을 걷습니다. 인쇄소 기계음, 철공소 망치 소리, 오래된 다방의 문 소리를 채집합니다. 마지막 30분은 각자 모은 소리를 이어 붙여 짧은 트랙을 만듭니다.",
    includes: ["녹음 장비 대여", "편집 실습", "완성 음원 파일 전달"],
    host: {
      name: "정우재",
      intro: "사운드 디자이너. 도시의 소음을 기록하는 작업을 합니다.",
    },
    slots: [
      { id: "cs-1", startsAt: "2026-10-07T13:00:00+09:00", durationMinutes: 210, seatsLeft: 5 },
      { id: "cs-2", startsAt: "2026-10-21T13:00:00+09:00", durationMinutes: 210, seatsLeft: 5 },
    ],
    rating: 4.6,
    reviewCount: 64,
  },
  {
    id: "no-phone-tea",
    title: "휴대폰 없는 차 한 잔",
    tagline: "90분 동안 아무것도 하지 않기",
    category: "wellness",
    price: 35000,
    location: "서울 서촌",
    gradient: "from-emerald-100 via-lime-100 to-amber-100",
    description:
      "입장할 때 휴대폰을 함에 넣고 시작합니다. 차를 세 번 우려 마시는 동안 대화는 선택이고 침묵이 기본입니다. 책을 읽어도 되고 창밖을 봐도 됩니다. 아무것도 하지 않는 것에 익숙해지는 시간입니다.",
    includes: ["차 3종 시음", "다과", "보관함"],
    host: {
      name: "한유정",
      intro: "서촌에서 작은 찻집을 합니다. 조용한 손님을 환영합니다.",
    },
    slots: [
      { id: "np-1", startsAt: "2026-10-03T15:00:00+09:00", durationMinutes: 90, seatsLeft: 6 },
      { id: "np-2", startsAt: "2026-10-10T15:00:00+09:00", durationMinutes: 90, seatsLeft: 1 },
      { id: "np-3", startsAt: "2026-10-17T15:00:00+09:00", durationMinutes: 90, seatsLeft: 6 },
    ],
    rating: 4.9,
    reviewCount: 311,
  },
  {
    id: "old-map-walk",
    title: "100년 전 지도로 걷기",
    tagline: "사라진 길을 따라 현재의 도시를 걷는다",
    category: "nature",
    price: 38000,
    location: "서울 종로",
    gradient: "from-orange-100 via-stone-200 to-sky-100",
    description:
      "1920년대 경성 지도 사본을 한 장씩 들고 출발합니다. 지도에는 있는데 지금은 없는 길, 지금은 있는데 지도에는 없는 건물을 찾아가며 세 시간을 걷습니다. 중간에 남아 있는 옛 골목에서 쉽니다.",
    includes: ["복각 지도 사본", "해설", "간식"],
    host: {
      name: "최민석",
      intro: "도시사 연구자. 옛 지도 수집이 취미입니다.",
    },
    slots: [
      { id: "om-1", startsAt: "2026-10-06T10:00:00+09:00", durationMinutes: 180, seatsLeft: 10 },
      { id: "om-2", startsAt: "2026-10-20T10:00:00+09:00", durationMinutes: 180, seatsLeft: 10 },
    ],
    rating: 4.8,
    reviewCount: 96,
  },
];

export function getExperience(id: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.id === id);
}

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export interface ExperienceFilter {
  category?: string;
  query?: string;
}

export function filterExperiences({ category, query }: ExperienceFilter): Experience[] {
  const keyword = query?.trim().toLowerCase();

  return EXPERIENCES.filter((experience) => {
    if (category && experience.category !== category) return false;
    if (!keyword) return true;

    return [experience.title, experience.tagline, experience.location, experience.description]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  });
}

export function seatsLeft(experienceId: string, slotId: string): number | undefined {
  return getExperience(experienceId)?.slots.find((slot) => slot.id === slotId)?.seatsLeft;
}
