export type StatusType = 'normal' | 'shortened' | 'closed' | 'custom';

export interface DayStatus {
  date: string; // ISO format YYYY-MM-DD
  status: StatusType;
  customText?: string;
  customColor?: string;
  isHoliday?: boolean;
  holidayName?: string;
}

export interface ClinicSettings {
  clinicName: string;
  clinicNameSize: number;
  clinicNameWeight: number;
  title: string;
  titleSize: number;
  titleWeight: number;
  titleColor: string;
  titleOutline: string; // 'none' | color
  subtitle: string;
  subtitleSize: number;
  subtitleWeight: number;
  footerText: string;
  footerSize: number;
  footerWeight: number;
  manualFooter: boolean;
  fontFamily: string;
  theme: ThemeId;
  paperOrientation: 'portrait' | 'landscape';
  weeksToShow: number;
  startWeekOffset: number;
  statusTextSize: number;
}

export type ThemeId = 'professional-blue' | 'forest-green' | 'soft-indigo' | 'elegant-gray' | 'warm-orange' | 'classic-red' | 'modern-teal';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  bg: string;
  text: string;
  headerBg: string;
  capsule: string;
}

export interface Holiday {
  date: string;
  name: string;
}

export interface DecoSvg {
  key: string;
  label: string;
  svg: string;
}

export interface DecoElement {
  id: string;
  svgKey: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
