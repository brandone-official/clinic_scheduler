import { Holiday, ThemeId, ThemeColors } from './types';

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
