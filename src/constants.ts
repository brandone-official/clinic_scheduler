import { Holiday, ThemeId, ThemeColors, DecoSvg } from './types';

export const HOLIDAYS: Holiday[] = [
  // 2026
  { date: '2026-01-01', name: '신정' },
  { date: '2026-02-16', name: '설날 연휴' },
  { date: '2026-02-17', name: '설날' },
  { date: '2026-02-18', name: '설날 연휴' },
  { date: '2026-03-01', name: '삼일절' },
  { date: '2026-03-02', name: '대체공휴일' },
  { date: '2026-05-01', name: '근로자의 날' },
  { date: '2026-05-05', name: '어린이날' },
  { date: '2026-05-24', name: '부처님오신날' },
  { date: '2026-05-25', name: '대체공휴일' },
  { date: '2026-06-06', name: '현충일' },
  { date: '2026-07-17', name: '제헌절' },
  { date: '2026-08-15', name: '광복절' },
  { date: '2026-08-17', name: '대체공휴일' },
  { date: '2026-09-24', name: '추석 연휴' },
  { date: '2026-09-25', name: '추석' },
  { date: '2026-09-26', name: '추석 연휴' },
  { date: '2026-10-03', name: '개천절' },
  { date: '2026-10-05', name: '대체공휴일' },
  { date: '2026-10-09', name: '한글날' },
  { date: '2026-12-25', name: '크리스마스' },

  // 2027
  { date: '2027-01-01', name: '신정' },
  { date: '2027-02-06', name: '설날 연휴' },
  { date: '2027-02-07', name: '설날' },
  { date: '2027-02-08', name: '설날 연휴' },
  { date: '2027-02-09', name: '대체공휴일' },
  { date: '2027-03-01', name: '삼일절' },
  { date: '2027-05-05', name: '어린이날' },
  { date: '2027-05-13', name: '부처님오신날' },
  { date: '2027-06-06', name: '현충일' },
  { date: '2027-06-07', name: '대체공휴일' },
  { date: '2027-07-17', name: '제헌절' },
  { date: '2027-08-15', name: '광복절' },
  { date: '2027-08-16', name: '대체공휴일' },
  { date: '2027-09-14', name: '추석 연휴' },
  { date: '2027-09-15', name: '추석' },
  { date: '2027-09-16', name: '추석 연휴' },
  { date: '2027-10-03', name: '개천절' },
  { date: '2027-10-04', name: '대체공휴일' },
  { date: '2027-10-09', name: '한글날' },
  { date: '2027-10-11', name: '대체공휴일' },
  { date: '2027-12-25', name: '크리스마스' },

  // 2028
  { date: '2028-01-01', name: '신정' },
  { date: '2028-01-26', name: '설날 연휴' },
  { date: '2028-01-27', name: '설날' },
  { date: '2028-01-28', name: '설날 연휴' },
  { date: '2028-03-01', name: '삼일절' },
  { date: '2028-05-02', name: '부처님오신날' },
  { date: '2028-05-05', name: '어린이날' },
  { date: '2028-06-06', name: '현충일' },
  { date: '2028-07-17', name: '제헌절' },
  { date: '2028-08-15', name: '광복절' },
  { date: '2028-10-02', name: '추석 연휴' },
  { date: '2028-10-03', name: '추석/개천절' },
  { date: '2028-10-04', name: '추석 연휴' },
  { date: '2028-10-05', name: '대체공휴일' },
  { date: '2028-10-09', name: '한글날' },
  { date: '2028-12-25', name: '크리스마스' },

  // 2029
  { date: '2029-01-01', name: '신정' },
  { date: '2029-02-12', name: '설날 연휴' },
  { date: '2029-02-13', name: '설날' },
  { date: '2029-02-14', name: '설날 연휴' },
  { date: '2029-02-15', name: '대체공휴일' },
  { date: '2029-03-01', name: '삼일절' },
  { date: '2029-05-05', name: '어린이날' },
  { date: '2029-05-07', name: '대체공휴일' },
  { date: '2029-05-20', name: '부처님오신날' },
  { date: '2029-05-21', name: '대체공휴일' },
  { date: '2029-06-06', name: '현충일' },
  { date: '2029-07-17', name: '제헌절' },
  { date: '2029-08-15', name: '광복절' },
  { date: '2029-09-21', name: '추석 연휴' },
  { date: '2029-09-22', name: '추석' },
  { date: '2029-09-23', name: '추석 연휴' },
  { date: '2029-09-24', name: '대체공휴일' },
  { date: '2029-10-03', name: '개천절' },
  { date: '2029-10-09', name: '한글날' },
  { date: '2029-12-25', name: '크리스마스' },

  // 2030
  { date: '2030-01-01', name: '신정' },
  { date: '2030-02-02', name: '설날 연휴' },
  { date: '2030-02-03', name: '설날' },
  { date: '2030-02-04', name: '설날 연휴' },
  { date: '2030-02-05', name: '대체공휴일' },
  { date: '2030-03-01', name: '삼일절' },
  { date: '2030-05-05', name: '어린이날' },
  { date: '2030-05-06', name: '대체공휴일' },
  { date: '2030-05-09', name: '부처님오신날' },
  { date: '2030-06-06', name: '현충일' },
  { date: '2030-07-17', name: '제헌절' },
  { date: '2030-08-15', name: '광복절' },
  { date: '2030-09-11', name: '추석 연휴' },
  { date: '2030-09-12', name: '추석' },
  { date: '2030-09-13', name: '추석 연휴' },
  { date: '2030-10-03', name: '개천절' },
  { date: '2030-10-09', name: '한글날' },
  { date: '2030-12-25', name: '크리스마스' },
];

export const THEMES: Record<ThemeId, ThemeColors> = {
  'professional-blue': {
    primary: '#1e40af',
    secondary: '#eff6ff',
    accent: '#bfdbfe',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#dbeafe'
  },
  'forest-green': {
    primary: '#166534',
    secondary: '#f0fdf4',
    accent: '#bbf7d0',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#dcfce7'
  },
  'soft-indigo': {
    primary: '#4338ca',
    secondary: '#f5f3ff',
    accent: '#ddd6fe',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#ede9fe'
  },
  'elegant-gray': {
    primary: '#334155',
    secondary: '#f8fafc',
    accent: '#e2e8f0',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#f1f5f9'
  },
  'warm-orange': {
    primary: '#c2410c',
    secondary: '#fff7ed',
    accent: '#ffedd5',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#ffedd5'
  },
  'classic-red': {
    primary: '#b91c1c',
    secondary: '#fef2f2',
    accent: '#fecaca',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#fee2e2'
  },
  'modern-teal': {
    primary: '#0f766e',
    secondary: '#f0fdfa',
    accent: '#ccfbf1',
    bg: '#ffffff',
    text: '#1f2937',
    headerBg: '#f9fafb',
    capsule: '#f3f4f6'
  }
};

export const FONT_OPTIONS = [
  { name: 'Pretendard', value: "'Pretendard', sans-serif" },
  { name: 'G마켓 산스', value: "'GmarketSansMedium', sans-serif" },
  { name: 'S-Core Dream', value: "'S-CoreDream-3Light', sans-serif" },
  { name: 'Noto Sans KR', value: "'Noto Sans KR', sans-serif" },
  { name: '나눔 고딕', value: "'Nanum Gothic', sans-serif" },
  { name: '나눔 스퀘어', value: "'NanumSquare', sans-serif" },
  { name: '나눔 스퀘어 라운드', value: "'NanumSquareRound', sans-serif" },
  { name: '나눔 명조', value: "'Nanum Myeongjo', serif" },
  { name: '바탕체', value: "'Batang', serif" },
  { name: '궁서체', value: "'Gungsuh', serif" }
];

export const RAINBOW_PALETTE = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#f59e0b', // Yellow
  '#10b981', // Green
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#a855f7'  // Violet
];

export const ESSENTIAL_PALETTE = [
  '#000000', '#434343', '#666666', '#990000', '#cc0000', '#e69138', '#3c78d8', '#3d85c6', '#6aa84f', '#674ea7'
];

export const GOOGLE_DOCS_PALETTE = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
  '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
  '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130',
];

const SPRING_DECOS: DecoSvg[] = [
  {
    key: 'cherry-blossom',
    label: '벚꽃',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><g transform="translate(50,50)"><ellipse cx="0" cy="-23" rx="11" ry="17" fill="#FFB7C5" transform="rotate(0)"/><ellipse cx="0" cy="-23" rx="11" ry="17" fill="#FF8FA3" transform="rotate(72)"/><ellipse cx="0" cy="-23" rx="11" ry="17" fill="#FFB7C5" transform="rotate(144)"/><ellipse cx="0" cy="-23" rx="11" ry="17" fill="#FF8FA3" transform="rotate(216)"/><ellipse cx="0" cy="-23" rx="11" ry="17" fill="#FFB7C5" transform="rotate(288)"/><circle cx="0" cy="0" r="9" fill="#FFF0F5"/><circle cx="-3" cy="-2" r="2" fill="#FFD6E0"/><circle cx="3" cy="-2" r="2" fill="#FFD6E0"/><circle cx="0" cy="3" r="2" fill="#FFD6E0"/></g></svg>`
  },
  {
    key: 'butterfly',
    label: '나비',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><ellipse cx="28" cy="34" rx="24" ry="17" fill="#F97316" opacity="0.9"/><ellipse cx="72" cy="34" rx="24" ry="17" fill="#FB923C" opacity="0.9"/><ellipse cx="30" cy="66" rx="17" ry="12" fill="#FDBA74" opacity="0.9"/><ellipse cx="70" cy="66" rx="17" ry="12" fill="#FED7AA" opacity="0.9"/><path d="M50,18 Q52,50 50,82" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="15" r="4" fill="#78350F"/><line x1="46" y1="13" x2="39" y2="6" stroke="#78350F" stroke-width="2" stroke-linecap="round"/><line x1="54" y1="13" x2="61" y2="6" stroke="#78350F" stroke-width="2" stroke-linecap="round"/><circle cx="38" cy="5" r="2" fill="#78350F"/><circle cx="62" cy="5" r="2" fill="#78350F"/></svg>`
  },
  {
    key: 'tulip',
    label: '튤립',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="50" y1="95" x2="50" y2="58" stroke="#4ADE80" stroke-width="4" stroke-linecap="round"/><path d="M50,58 Q33,42 36,24 Q43,12 50,18 Q57,12 64,24 Q67,42 50,58Z" fill="#F43F5E"/><path d="M50,58 Q36,46 38,28 Q43,16 50,20" fill="#FB7185" opacity="0.5"/><path d="M50,78 Q40,70 43,62" stroke="#4ADE80" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="40" cy="60" rx="9" ry="6" fill="#4ADE80" transform="rotate(-25,40,60)"/></svg>`
  },
  {
    key: 'sprout',
    label: '새싹',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M50,92 L50,44" stroke="#65A30D" stroke-width="5" stroke-linecap="round"/><path d="M50,62 Q34,46 37,28 Q49,18 55,36 Q58,48 50,62Z" fill="#84CC16"/><path d="M50,76 Q66,60 63,42 Q51,32 45,50 Q42,62 50,76Z" fill="#A3E635"/><circle cx="50" cy="42" r="5" fill="#D9F99D"/></svg>`
  },
  {
    key: 'ladybug',
    label: '무당벌레',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><ellipse cx="50" cy="60" rx="30" ry="25" fill="#EF4444"/><path d="M21,56 Q50,28 79,56" fill="#1C1917"/><line x1="50" y1="28" x2="50" y2="85" stroke="#1C1917" stroke-width="2.5"/><circle cx="37" cy="63" r="7" fill="#1C1917"/><circle cx="63" cy="63" r="7" fill="#1C1917"/><circle cx="38" cy="76" r="5" fill="#1C1917"/><circle cx="62" cy="76" r="5" fill="#1C1917"/><circle cx="50" cy="38" r="9" fill="#1C1917"/><circle cx="46" cy="36" r="2.5" fill="white"/><circle cx="54" cy="36" r="2.5" fill="white"/><line x1="40" y1="30" x2="34" y2="22" stroke="#1C1917" stroke-width="2"/><line x1="60" y1="30" x2="66" y2="22" stroke="#1C1917" stroke-width="2"/></svg>`
  }
];

const SUMMER_DECOS: DecoSvg[] = [
  {
    key: 'sunflower',
    label: '해바라기',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="50" y1="95" x2="50" y2="56" stroke="#65A30D" stroke-width="4" stroke-linecap="round"/><path d="M50,75 Q42,68 44,62" stroke="#65A30D" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="41" cy="60" rx="9" ry="6" fill="#65A30D" transform="rotate(-20,41,60)"/><g transform="translate(50,42)"><ellipse cy="-21" rx="8" ry="13" fill="#FACC15" transform="rotate(0)"/><ellipse cy="-21" rx="8" ry="13" fill="#FDE047" transform="rotate(40)"/><ellipse cy="-21" rx="8" ry="13" fill="#FACC15" transform="rotate(80)"/><ellipse cy="-21" rx="8" ry="13" fill="#FDE047" transform="rotate(120)"/><ellipse cy="-21" rx="8" ry="13" fill="#FACC15" transform="rotate(160)"/><ellipse cy="-21" rx="8" ry="13" fill="#FDE047" transform="rotate(200)"/><ellipse cy="-21" rx="8" ry="13" fill="#FACC15" transform="rotate(240)"/><ellipse cy="-21" rx="8" ry="13" fill="#FDE047" transform="rotate(280)"/><ellipse cy="-21" rx="8" ry="13" fill="#FACC15" transform="rotate(320)"/><circle r="16" fill="#92400E"/><circle r="12" fill="#78350F"/><circle cx="-4" cy="-4" r="2" fill="#92400E"/><circle cx="4" cy="-4" r="2" fill="#92400E"/><circle cx="0" cy="4" r="2" fill="#92400E"/></g></svg>`
  },
  {
    key: 'wave',
    label: '파도',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M5,35 Q18,20 30,35 Q43,50 56,35 Q69,20 95,35" stroke="#0EA5E9" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M5,52 Q18,37 30,52 Q43,67 56,52 Q69,37 95,52" stroke="#38BDF8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M5,69 Q18,54 30,69 Q43,84 56,69 Q69,54 95,69" stroke="#BAE6FD" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`
  },
  {
    key: 'watermelon',
    label: '수박',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M12,68 A42,42 0 0,1 88,68Z" fill="#4ADE80"/><path d="M16,68 A38,38 0 0,1 84,68Z" fill="#86EFAC"/><path d="M20,68 A35,35 0 0,1 80,68Z" fill="#F87171"/><line x1="50" y1="30" x2="50" y2="68" stroke="#166534" stroke-width="2.5" opacity="0.6"/><line x1="50" y1="68" x2="26" y2="43" stroke="#166534" stroke-width="2" opacity="0.6"/><line x1="50" y1="68" x2="74" y2="43" stroke="#166534" stroke-width="2" opacity="0.6"/><circle cx="34" cy="58" r="3.5" fill="#1C1917"/><circle cx="50" cy="55" r="3.5" fill="#1C1917"/><circle cx="66" cy="58" r="3.5" fill="#1C1917"/></svg>`
  },
  {
    key: 'firefly',
    label: '반딧불이',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><circle cx="50" cy="50" r="28" fill="#FDE047" opacity="0.15"/><circle cx="50" cy="50" r="20" fill="#FDE047" opacity="0.25"/><ellipse cx="50" cy="54" rx="10" ry="7" fill="#1C1917"/><ellipse cx="50" cy="44" rx="7" ry="5" fill="#374151"/><circle cx="50" cy="52" r="8" fill="#FDE047" opacity="0.9"/><circle cx="50" cy="52" r="5" fill="#FEFCE8"/><line x1="38" y1="57" x2="25" y2="64" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/><line x1="62" y1="57" x2="75" y2="64" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/><line x1="36" y1="53" x2="23" y2="54" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/><line x1="64" y1="53" x2="77" y2="54" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/><circle cx="46" cy="42" r="2" fill="white" opacity="0.7"/><circle cx="54" cy="42" r="2" fill="white" opacity="0.7"/></svg>`
  },
  {
    key: 'cloud',
    label: '구름',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><circle cx="34" cy="58" r="20" fill="#E2E8F0"/><circle cx="52" cy="50" r="26" fill="#F1F5F9"/><circle cx="72" cy="56" r="18" fill="#E2E8F0"/><rect x="16" y="58" width="75" height="22" rx="3" fill="#F1F5F9"/><circle cx="34" cy="54" r="18" fill="#F8FAFC"/><circle cx="52" cy="46" r="24" fill="#FFFFFF"/><circle cx="72" cy="52" r="16" fill="#F8FAFC"/><rect x="18" y="52" width="72" height="24" rx="3" fill="#FFFFFF"/></svg>`
  }
];

const AUTUMN_DECOS: DecoSvg[] = [
  {
    key: 'maple-leaf',
    label: '단풍잎',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M50,8 L56,28 L72,18 L62,36 L82,34 L66,46 L76,64 L56,54 L50,74 L44,54 L24,64 L34,46 L18,34 L38,36 L28,18 L44,28 Z" fill="#EF4444"/><path d="M50,8 L56,28 L72,18 L62,36 L82,34 L66,46 L76,64 L56,54 L50,74" fill="#F97316" opacity="0.45"/><line x1="50" y1="74" x2="50" y2="93" stroke="#92400E" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    key: 'ginkgo-leaf',
    label: '은행잎',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M50,78 L18,32 Q22,8 50,12 Q78,8 82,32 Z" fill="#FDE047"/><path d="M50,78 L18,32 Q22,8 50,12" fill="#FEF08A" opacity="0.55"/><line x1="50" y1="78" x2="50" y2="93" stroke="#92400E" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="78" x2="28" y2="40" stroke="#CA8A04" stroke-width="1.5" opacity="0.6"/><line x1="50" y1="78" x2="72" y2="40" stroke="#CA8A04" stroke-width="1.5" opacity="0.6"/><line x1="50" y1="78" x2="50" y2="16" stroke="#CA8A04" stroke-width="1.5" opacity="0.6"/></svg>`
  },
  {
    key: 'acorn',
    label: '도토리',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><ellipse cx="50" cy="65" rx="26" ry="28" fill="#B45309"/><ellipse cx="50" cy="65" rx="24" ry="26" fill="#D97706"/><ellipse cx="50" cy="42" rx="30" ry="16" fill="#78350F"/><ellipse cx="50" cy="42" rx="27" ry="13" fill="#92400E"/><line x1="50" y1="26" x2="50" y2="16" stroke="#78350F" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="16" x2="44" y2="10" stroke="#78350F" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    key: 'silver-grass',
    label: '억새',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M28,93 Q26,68 32,48 Q36,32 28,14" stroke="#D1D5DB" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M43,93 Q41,65 48,43 Q52,27 46,8" stroke="#9CA3AF" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M58,93 Q60,67 54,46 Q50,30 58,12" stroke="#D1D5DB" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M70,93 Q72,70 68,52 Q65,38 72,20" stroke="#E5E7EB" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22,93 Q20,72 26,54 Q28,42 22,24" stroke="#F3F4F6" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="28" cy="18" rx="6" ry="12" fill="#E5E7EB" opacity="0.7" transform="rotate(-15,28,18)"/><ellipse cx="47" cy="12" rx="5" ry="10" fill="#D1D5DB" opacity="0.7" transform="rotate(10,47,12)"/><ellipse cx="57" cy="15" rx="5" ry="10" fill="#E5E7EB" opacity="0.7" transform="rotate(-8,57,15)"/></svg>`
  },
  {
    key: 'pumpkin',
    label: '호박',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><ellipse cx="50" cy="62" rx="36" ry="28" fill="#F97316"/><ellipse cx="28" cy="62" rx="16" ry="26" fill="#FB923C"/><ellipse cx="50" cy="62" rx="16" ry="28" fill="#F97316"/><ellipse cx="72" cy="62" rx="16" ry="26" fill="#FB923C"/><ellipse cx="50" cy="62" rx="34" ry="26" fill="none" stroke="#EA580C" stroke-width="2" opacity="0.4"/><rect x="46" y="32" width="8" height="14" rx="3" fill="#166534"/><path d="M50,32 Q61,22 66,27" stroke="#166534" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M40,57 L45,64 L40,70" stroke="#EA580C" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M60,57 L55,64 L60,70" stroke="#EA580C" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M43,64 L57,64" stroke="#EA580C" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`
  }
];

const WINTER_DECOS: DecoSvg[] = [
  {
    key: 'snowflake',
    label: '눈꽃',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="50" y1="6" x2="50" y2="94" stroke="#7DD3FC" stroke-width="4" stroke-linecap="round"/><line x1="6" y1="50" x2="94" y2="50" stroke="#7DD3FC" stroke-width="4" stroke-linecap="round"/><line x1="20" y1="20" x2="80" y2="80" stroke="#7DD3FC" stroke-width="4" stroke-linecap="round"/><line x1="80" y1="20" x2="20" y2="80" stroke="#7DD3FC" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="8" fill="#38BDF8"/><circle cx="50" cy="6" r="4" fill="#BAE6FD"/><circle cx="50" cy="94" r="4" fill="#BAE6FD"/><circle cx="6" cy="50" r="4" fill="#BAE6FD"/><circle cx="94" cy="50" r="4" fill="#BAE6FD"/><circle cx="20" cy="20" r="4" fill="#BAE6FD"/><circle cx="80" cy="80" r="4" fill="#BAE6FD"/><circle cx="80" cy="20" r="4" fill="#BAE6FD"/><circle cx="20" cy="80" r="4" fill="#BAE6FD"/></svg>`
  },
  {
    key: 'mitten',
    label: '장갑',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M30,82 Q18,76 20,54 Q22,38 26,28 L32,26 Q34,38 35,52 Q42,33 44,23 Q48,15 56,20 Q62,27 54,40 L60,28 Q65,22 71,26 Q77,33 70,44 L66,36 Q71,31 75,36 Q80,44 72,56 Q63,70 56,74 L56,82 Z" fill="#EF4444"/><rect x="26" y="80" width="30" height="12" rx="5" fill="#DC2626"/><path d="M30,82 L56,82" stroke="#B91C1C" stroke-width="1.5" opacity="0.4"/></svg>`
  },
  {
    key: 'lantern',
    label: '설날등불',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="50" y1="4" x2="50" y2="18" stroke="#CA8A04" stroke-width="3"/><line x1="26" y1="18" x2="74" y2="18" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="57" rx="22" ry="36" fill="#EF4444"/><ellipse cx="50" cy="57" rx="19" ry="33" fill="#F87171"/><line x1="32" y1="20" x2="28" y2="93" stroke="#B45309" stroke-width="2" opacity="0.5"/><line x1="68" y1="20" x2="72" y2="93" stroke="#B45309" stroke-width="2" opacity="0.5"/><line x1="28" y1="93" x2="72" y2="93" stroke="#CA8A04" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="93" x2="47" y2="100" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="93" x2="50" y2="100" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/><line x1="50" y1="93" x2="53" y2="100" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/><text x="50" y="64" text-anchor="middle" font-size="22" font-weight="bold" fill="#FEF3C7" font-family="serif">福</text></svg>`
  },
  {
    key: 'snowman',
    label: '눈사람',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><circle cx="50" cy="74" r="22" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/><circle cx="50" cy="38" r="17" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/><circle cx="44" cy="34" r="3" fill="#1E293B"/><circle cx="56" cy="34" r="3" fill="#1E293B"/><path d="M44,42 Q50,48 56,42" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="50" cy="64" r="3" fill="#94A3B8"/><circle cx="50" cy="72" r="3" fill="#94A3B8"/><circle cx="50" cy="80" r="3" fill="#94A3B8"/><path d="M18,62 L34,68" stroke="#92400E" stroke-width="3.5" stroke-linecap="round"/><path d="M82,62 L66,68" stroke="#92400E" stroke-width="3.5" stroke-linecap="round"/><path d="M45,22 L50,13 L55,22" stroke="#EF4444" stroke-width="2.5" fill="#EF4444" stroke-linejoin="round"/></svg>`
  },
  {
    key: 'light-bulb',
    label: '전구',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="4" y1="18" x2="96" y2="18" stroke="#4B5563" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="18" x2="50" y2="32" stroke="#4B5563" stroke-width="2.5"/><ellipse cx="50" cy="56" rx="22" ry="27" fill="#FDE047"/><ellipse cx="50" cy="56" rx="18" ry="22" fill="#FEF08A"/><rect x="40" y="81" width="20" height="8" rx="2" fill="#9CA3AF"/><rect x="42" y="89" width="16" height="5" rx="2" fill="#6B7280"/><line x1="43" y1="46" x2="43" y2="68" stroke="#FEF9C3" stroke-width="2" opacity="0.8" stroke-linecap="round"/><line x1="50" y1="40" x2="50" y2="70" stroke="#FEF9C3" stroke-width="2" opacity="0.8" stroke-linecap="round"/><line x1="57" y1="46" x2="57" y2="68" stroke="#FEF9C3" stroke-width="2" opacity="0.8" stroke-linecap="round"/></svg>`
  }
];

export const MONTHLY_DECO_SVGS: Record<number, DecoSvg[]> = {
  1: WINTER_DECOS,
  2: WINTER_DECOS,
  3: SPRING_DECOS,
  4: SPRING_DECOS,
  5: SPRING_DECOS,
  6: SUMMER_DECOS,
  7: SUMMER_DECOS,
  8: SUMMER_DECOS,
  9: AUTUMN_DECOS,
  10: AUTUMN_DECOS,
  11: AUTUMN_DECOS,
  12: WINTER_DECOS
};
