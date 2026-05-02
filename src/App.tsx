import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  parseISO,
  getDay,
  addWeeks,
  addDays,
  endOfDay
} from 'date-fns';
import {
  Settings2,
  Printer,
  Palette,
  Type,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  X,
  Info,
  Download,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

import {
  StatusType,
  DayStatus,
  ClinicSettings,
  ThemeId,
  Holiday,
  DecoElement
} from './types';
import {
  HOLIDAYS,
  THEMES,
  FONT_OPTIONS,
  RAINBOW_PALETTE,
  MONTHLY_DECO_SVGS
} from './constants';

function MobileBlock() {
  const LIME = '#C8D84A';
  const PURPLE = '#3D2C8D';

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');`}</style>
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        width: '100vw',
        height: '100vh',
        background: PURPLE,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Montserrat', sans-serif",
        boxSizing: 'border-box',
        padding: '2rem',
      }}>

        {/* 우측 상단 라임 삼각형 */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 120px 120px 0',
          borderColor: `transparent ${LIME} transparent transparent`,
        }} />

        {/* 스마트폰 SVG 아이콘 */}
        <svg
          width="56" height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: 'block', marginBottom: '2rem' }}
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>

        {/* 1번 문구: 흰색 bold */}
        <p style={{
          margin: '0 0 0.9rem 0',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.55,
          textAlign: 'center',
          wordBreak: 'keep-all',
        }}>
          이 페이지는<br />인쇄·PDF 저장 전용<br />서비스입니다.
        </p>

        {/* 2번 문구: 라임 */}
        <p style={{
          margin: 0,
          fontSize: '0.875rem',
          fontWeight: 500,
          color: LIME,
          lineHeight: 1.8,
          textAlign: 'center',
          wordBreak: 'keep-all',
        }}>
          PC 브라우저에서 접속하시면<br />
          정상적으로 이용하실 수 있습니다.
        </p>

        {/* 하단 브랜딩: BY BRAND ONE. */}
        <p style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          margin: 0,
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: '#ffffff',
        }}>
          BY BRA<span style={{ color: LIME }}>ND</span>
          {' '}
          <span style={{ color: LIME }}>O</span>NE.
        </p>

      </div>
    </>
  );
}

function isMobileDevice() {
  return window.innerWidth < 768;
}

export default function App() {
  const [isMobile, setIsMobile] = useState(isMobileDevice);

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isMobile) return <MobileBlock />;
  return <AppContent />;
}

function AppContent() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // Default to May 2026
  const [dayStatuses, setDayStatuses] = useState<Record<string, DayStatus>>({});
  const [dragStart, setDragStart] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | 'reset'>('closed');
  const [selectedColor, setSelectedColor] = useState<string>(RAINBOW_PALETTE[0]);
  const [selectedElement, setSelectedElement] = useState<'clinicName' | 'title' | 'subtitle' | 'calendar' | 'footer' | 'orientation' | 'theme' | 'deco' | null>('orientation');
  const [isExporting, setIsExporting] = useState(false);
  
  const [settings, setSettings] = useState<ClinicSettings>(() => {
    const saved = localStorage.getItem('clinic-announcement-settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    return {
      clinicName: '',
      clinicNameSize: 24,
      clinicNameWeight: 700,
      title: '5월 진료 안내',
      titleSize: 100,
      titleWeight: 800,
      titleColor: '#000000',
      titleOutline: 'none',
      subtitle: '내원 및 진료 예약에 착오 없으시길 바랍니다',
      subtitleSize: 24,
      subtitleWeight: 700,
      footerText: '',
      footerSize: 24,
      footerWeight: 600,
      manualFooter: false,
      fontFamily: FONT_OPTIONS[0].value,
      theme: 'professional-blue',
      paperOrientation: 'portrait',
      weeksToShow: 3,
      startWeekOffset: 0,
      statusTextSize: 20
    };
  });

  const [autoMonthInTitle, setAutoMonthInTitle] = useState(true);
  const [customInput, setCustomInput] = useState({ text: '', color: RAINBOW_PALETTE[0] });
  const [guideTarget, setGuideTarget] = useState<string | null>(null);
  const [dynamicHolidays, setDynamicHolidays] = useState<Holiday[]>([]);
  const [decoElements, setDecoElements] = useState<DecoElement[]>([]);
  const [selectedDecoId, setSelectedDecoId] = useState<string | null>(null);
  const [activeDecoSeason, setActiveDecoSeason] = useState<'봄'|'여름'|'가을'|'겨울'>(() => {
    const m = new Date(2026, 4, 1).getMonth() + 1;
    if (m >= 3 && m <= 5) return '봄';
    if (m >= 6 && m <= 8) return '여름';
    if (m >= 9 && m <= 11) return '가을';
    return '겨울';
  });
  const previewRef = useRef<HTMLDivElement>(null);
  const decoInteractionRef = useRef<{
    type: 'move' | 'resize-se' | 'resize-sw' | 'resize-nw';
    id: string;
    startX: number;
    startY: number;
    startElX: number;
    startElY: number;
    startElW: number;
    startElH: number;
  } | null>(null);

  const GUIDES: Record<string, { 
    title: string; 
    sections: { type: 'p' | 'li'; text: string; highlight?: string; color?: string }[]; 
    tip: string 
  }> = {
    orientation: {
      title: '용지 방향 및 출력 규격 가이드',
      sections: [
        { type: 'p', text: '본 프로그램은 A4 용지 규격을 기준으로 설계되었습니다. 게시 환경에 맞춰 선택하세요.' },
        { type: 'li', text: '가로(Landscape): 월간 일정을 한눈에 파악하기 좋으며 넓은 시야를 제공합니다.', highlight: '가로(Landscape)' },
        { type: 'li', text: '세로(Portrait): 좁은 공간이나 현관문 부착용으로 적합합니다.', highlight: '세로(Portrait)' },
      ],
      tip: '출력물의 가독성을 위해 가로 방향일 경우 폰트 크기를 10% 정도 더 크게 설정하는 것이 시각적으로 안정감을 줍니다.'
    },
    theme: {
      title: '브랜드 아이덴티티 및 테마 설정',
      sections: [
        { type: 'p', text: '병원 인테리어와 로고 색상에 맞춘 전문 디자이너의 배색 테마입니다.' },
        { type: 'li', text: '고대비 배색: 출력 시 색 바램이 적고 정보 전달력이 뛰어난 7종 테마.', highlight: '7종 테마' },
        { type: 'li', text: '가독성 최적화: 고령 환자를 고려한 명확하고 굵은 서체 선별.', highlight: '고령 환자', color: 'blue' },
      ],
      tip: '신뢰감을 주려면 블루 계열을, 따뜻한 느낌을 주려면 오렌지 또는 그린 계열의 테마를 권장합니다.'
    },
    clinicName: {
      title: '의료기관 명칭 표시 가이드',
      sections: [
        { type: 'p', text: '안내문의 신뢰도를 높이기 위해 기관의 공식 명칭을 명확히 노출하세요.' },
        { type: 'li', text: '공간 활용: 로고 인쇄 용지 사용 시 명칭을 비워 여백을 확보하세요.', highlight: '공간 활용' },
        { type: 'li', text: '시각적 무게감: 굵기 조절을 통해 브랜드의 존재감을 강조할 수 있습니다.', highlight: '굵기 조절' },
      ],
      tip: '기관 이름 뒤에 "진료 안내"를 붙이지 마세요. 메인 타이틀에서 더 효과적으로 연출할 수 있습니다.'
    },
    title: {
      title: '메인 타이틀 시각 전략',
      sections: [
        { type: 'p', text: '가장 먼저 시선이 닿는 영역으로 목적이 명확한 문구를 사용해야 합니다.' },
        { type: 'li', text: '문구 권장: "5월 휴진 안내" 등 핵심 키워드를 포함하세요.', highlight: '핵심 키워드' },
        { type: 'li', text: '외곽선 효과: 복잡한 배경에서도 텍스트를 뚜렷하게 유지합니다.', highlight: '외곽선 효과', color: 'indigo' },
      ],
      tip: '검정 배경에 흰색 외곽선을 쓰거나 강렬한 색상을 조합하면 정보 위계가 뚜렷해집니다.'
    },
    subtitle: {
      title: '서브 메시지 활용법',
      sections: [
        { type: 'p', text: '메인 타이틀에서 다 담지 못한 핵심 공지나 정중한 인사를 배치하세요.' },
        { type: 'li', text: '주요 용도: 예약 안내, 주차 지원 유무, 내원 당부 메시지 등.', highlight: '예약 안내' },
        { type: 'li', text: '디자인 균형: 메인 타이틀 크기의 30~40% 유지를 권장합니다.', highlight: '30~40%' },
      ],
      tip: '맺음말에 "내원에 착오 없으시길 바랍니다"를 추가하면 훨씬 정중한 느낌을 줍니다.'
    },
    calendar: {
      title: '스마트 일정 관리 시스템',
      sections: [
        { type: 'p', text: '마우스 클릭과 드래그만으로 직관적인 일정 관리가 가능합니다.' },
        { type: 'li', text: '연속 드래그: 여러 날짜를 밀어 기간 설정을 순식간에 완료하세요.', highlight: '순식간에 완료', color: 'emerald' },
        { type: 'li', text: '자동 변환: 입력된 텍스트는 하단 공지 문구로 자동 생성됩니다.', highlight: '공지 문구로 자동 생성' },
      ],
      tip: '공휴일은 자동 지정되지만, 대체 휴일 등은 마커를 사용해 한 번 더 강조해 주세요.'
    },
    footer: {
      title: '하단 텍스트 자동 조합기',
      sections: [
        { type: 'p', text: '본 프로그램의 핵심 비서 기능으로, 일정을 분석해 문장을 생성합니다.' },
        { type: 'li', text: '자연어 생성: 사람이 쓴 것처럼 자연스러운 문장 구조를 제공합니다.', highlight: '자연스러운 문장' },
        { type: 'li', text: '직접 수정: 구체적인 사유나 연락처를 덧붙여 완성도를 높이세요.', highlight: '직접 수정', color: 'rose' },
      ],
      tip: '끝에 "건강한 하루 되십시오" 같은 고객 지향적 표현을 추가해 전문성을 높이세요.'
    },
    deco: {
      title: '꾸밈 요소 활용 가이드',
      sections: [
        { type: 'p', text: '봄·여름·가을·겨울 계절 테마 요소를 활용해 안내문에 계절감을 더할 수 있습니다.' },
        { type: 'li', text: '자유 배치: 요소를 드래그해 원하는 위치로 이동하고, 오른쪽 하단 핸들로 크기를 조절하세요.', highlight: '드래그', color: 'emerald' },
        { type: 'li', text: '배경 장식 구조: 꾸밈 요소는 항상 텍스트·캘린더 콘텐츠 뒤에 깔려 가독성을 방해하지 않습니다.', highlight: '콘텐츠 뒤에 깔려' },
        { type: 'li', text: '선택 및 삭제: 요소를 클릭해 선택하면 파란 테두리가 표시되며, X 버튼으로 삭제할 수 있습니다.', highlight: 'X 버튼으로 삭제', color: 'rose' },
      ],
      tip: '요소를 너무 많이 넣으면 가독성이 떨어집니다. 1~2개를 용지 여백에 배치하는 것을 권장합니다.'
    }
  };


  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = currentDate.getFullYear();
        // Fetch specific year to keep it granular, or basic.json for all.
        // The project structure shows basic.json includes all years (2018~).
        const response = await fetch('https://holidays.hyunbin.page/basic.json');
        if (!response.ok) throw new Error('Failed to fetch holidays');
        const data = await response.json();
        
        const formatted: Holiday[] = Object.entries(data).map(([date, names]) => ({
          date,
          name: Array.isArray(names) ? names.join(', ') : String(names)
        }));
        
        setDynamicHolidays(formatted);
      } catch (error) {
        console.error('Holiday fetch error:', error);
      }
    };
    
    fetchHolidays();
  }, [currentDate.getFullYear()]);

  useEffect(() => {
    if (autoMonthInTitle) {
      const month = format(currentDate, 'M');
      setSettings(prev => ({
        ...prev,
        title: `${month}월 진료 안내`
      }));
    }
  }, [currentDate, autoMonthInTitle]);

  useEffect(() => {
    localStorage.setItem('clinic-announcement-settings', JSON.stringify(settings));
  }, [settings]);

  const calendarInfo = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const firstWeekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const weeksInMonth = Math.ceil((endOfMonth(currentDate).getDate() + monthStart.getDay()) / 7);
    const maxOffsetAvailable = weeksInMonth >= 5 ? 4 : 3;
    const calendarStart = addWeeks(firstWeekStart, Math.min(settings.startWeekOffset, maxOffsetAvailable));
    const calendarEnd = endOfDay(addDays(calendarStart, (3 * 7) - 1));
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return { weeksInMonth, calendarDays: days };
  }, [currentDate, settings.startWeekOffset]);

  const { weeksInMonth, calendarDays } = calendarInfo;

  const getHoliday = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    // Prefer dynamic data from external source, fallback to static constants
    const dynamic = dynamicHolidays.find(h => h.date === dateStr);
    if (dynamic) return dynamic;
    return HOLIDAYS.find(h => h.date === dateStr);
  };

  const toggleDayStatus = (dateStr: string, statusOverride?: StatusType | 'reset') => {
    const targetAction = statusOverride || selectedStatus;
    setDayStatuses(prev => {
      if (targetAction === 'reset') {
        const next = { ...prev };
        delete next[dateStr];
        return next;
      }
      const targetStatus = targetAction as StatusType;
      return {
        ...prev,
        [dateStr]: {
          date: dateStr,
          status: targetStatus,
          customText: targetStatus === 'custom' ? customInput.text : undefined,
          customColor: targetStatus === 'normal' ? undefined : selectedColor,
          isHoliday: !!getHoliday(parseISO(dateStr)),
          holidayName: getHoliday(parseISO(dateStr))?.name
        }
      };
    });
  };

  const handleMouseDown = (e: React.MouseEvent, dateStr: string) => {
    e.stopPropagation();
    if (selectedElement !== 'calendar') {
      setSelectedElement('calendar');
      return;
    }
    setDragStart(dateStr);
    isDraggingRef.current = false;
    toggleDayStatus(dateStr);
  };

  const handleMouseEnter = (dateStr: string) => {
    if (selectedElement !== 'calendar') return;
    if (dragStart) {
      isDraggingRef.current = true;
      toggleDayStatus(dateStr, selectedStatus);
    }
  };

  const handleMouseUp = () => {
    decoInteractionRef.current = null;
    setDragStart(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleDecoMouseDown = (e: React.MouseEvent, id: string, type: 'move' | 'resize-se' | 'resize-sw' | 'resize-nw') => {
    e.stopPropagation();
    e.preventDefault();
    const el = decoElements.find(d => d.id === id);
    if (!el) return;
    decoInteractionRef.current = {
      type, id,
      startX: e.clientX, startY: e.clientY,
      startElX: el.x, startElY: el.y,
      startElW: el.width, startElH: el.height
    };
    setSelectedDecoId(id);
  };

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!decoInteractionRef.current) return;
    const { type, id, startX, startY, startElX, startElY, startElW, startElH } = decoInteractionRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    setDecoElements(prev => prev.map(el => {
      if (el.id !== id) return el;
      if (type === 'move') return { ...el, x: startElX + dx, y: startElY + dy };
      if (type === 'resize-se') {
        return { ...el, width: Math.max(30, startElW + dx), height: Math.max(30, startElH + dy) };
      }
      if (type === 'resize-sw') {
        const newW = Math.max(30, startElW - dx);
        return { ...el, x: startElX + startElW - newW, width: newW, height: Math.max(30, startElH + dy) };
      }
      if (type === 'resize-nw') {
        const newW = Math.max(30, startElW - dx);
        const newH = Math.max(30, startElH - dy);
        return { ...el, x: startElX + startElW - newW, y: startElY + startElH - newH, width: newW, height: newH };
      }
      return el;
    }));
  };

  useEffect(() => {
    if (settings.manualFooter) return;
    const visibleDateStrings = calendarDays.map(d => format(d, 'yyyy-MM-dd'));
    const statuses = (Object.values(dayStatuses) as DayStatus[]).filter(d => 
      (d.status === 'closed' || d.status === 'shortened' || d.status === 'custom') && 
      visibleDateStrings.includes(d.date)
    ).sort((a, b) => a.date.localeCompare(b.date));

    if (statuses.length > 0) {
      const segments: string[] = [];
      const closed = statuses.filter(d => d.status === 'closed');
      const shortened = statuses.filter(d => d.status === 'shortened');
      const custom = statuses.filter(d => d.status === 'custom');
      
      if (closed.length > 0) segments.push(`${closed.map(d => format(parseISO(d.date), 'd일')).join(', ')}은 휴진`);
      if (shortened.length > 0) segments.push(`${shortened.map(d => format(parseISO(d.date), 'd일')).join(', ')}은 단축진료`);
      if (custom.length > 0) {
        const groups: Record<string, string[]> = {};
        custom.forEach(d => {
          const txt = d.customText || '일정';
          if (!groups[txt]) groups[txt] = [];
          groups[txt].push(format(parseISO(d.date), 'd일'));
        });
        Object.entries(groups).forEach(([txt, dates]) => segments.push(`${dates.join(', ')}은 ${txt}`));
      }
      
      let generated = "";
      if (settings.paperOrientation === 'portrait') {
        generated = segments.join('\n');
      } else {
        generated = segments.map((s, i) => i === segments.length - 1 ? s + '입니다.' : s + '이며,').join(' ');
      }
      setSettings(prev => ({ ...prev, footerText: generated }));
    } else {
      setSettings(prev => ({ ...prev, footerText: '' }));
    }
  }, [dayStatuses, calendarDays, settings.manualFooter]);

  const activeTheme = THEMES[settings.theme] || THEMES['professional-blue'];

  const handlePrint = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>진료 안내문 인쇄</title>
              <style>
                body { margin: 0; display: flex; justify-content: center; align-items: flex-start; }
                img { max-width: 100%; height: auto; }
                @page { margin: 0; size: auto; }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" onload="window.print(); window.close();" />
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Print generation failed:', error);
      alert('인쇄 준비 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSavePDF = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      const element = previewRef.current;
      
      // Use toPng from html-to-image which handles modern CSS (oklch) better
      const imgData = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3, // High resolution
        backgroundColor: '#ffffff',
        style: {
          transform: 'none',
        }
      });
      
      const pdf = new jsPDF({
        orientation: settings.paperOrientation,
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`진료안내문_${format(currentDate, 'yyyyMM')}.pdf`);
    } catch (error) {
      console.error('PDF Generation failed:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  // --- Property Panels ---
  const renderOrientationProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">용지 방향</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'landscape', label: '가로 A4', icon: <div className="w-6 h-4 border-2 border-current rounded-sm" /> },
            { id: 'portrait', label: '세로 A4', icon: <div className="w-4 h-6 border-2 border-current rounded-sm" /> }
          ].map(opt => (
            <button key={opt.id} onClick={() => setSettings({...settings, paperOrientation: opt.id as any})}
              className={cn("flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-bold text-[13px]",
                settings.paperOrientation === opt.id ? "border-blue-600 bg-blue-600/10 text-blue-400" : "border-[#3f3f3f] bg-transparent text-slate-300 hover:border-slate-500 shadow-sm")}>
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThemeProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">테마 및 서체</label>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="text-[12px] text-slate-300 font-bold">테마 브랜딩</span>
            <div className="grid grid-cols-7 gap-1.5">
              {(Object.keys(THEMES) as ThemeId[]).map(id => (
                <button key={id} onClick={() => setSettings({...settings, theme: id})}
                  className={cn("w-full aspect-square rounded-md border-2 transition-all relative overflow-hidden",
                    settings.theme === id ? "border-white scale-110 shadow-lg" : "border-transparent hover:border-slate-500")}>
                  <div className="w-full h-full" style={{ backgroundColor: THEMES[id].primary }} />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-[12px] text-slate-300 font-bold">서체 선택</span>
            <select value={settings.fontFamily} onChange={e => setSettings({...settings, fontFamily: e.target.value})}
              className="w-full px-3 py-3 bg-[#1a1a1a] border border-[#3f3f3f] rounded-lg text-sm font-bold text-slate-100 outline-none focus:ring-1 focus:ring-blue-500">
              {FONT_OPTIONS.map(font => <option key={font.name} value={font.value} style={{ fontFamily: font.value }}>{font.name}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClinicNameProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-3">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">한의원 이름</label>
        <input type="text" value={settings.clinicName} onChange={e => setSettings({...settings, clinicName: e.target.value})}
          className="w-full px-3 py-3 bg-[#1a1a1a] border border-[#3f3f3f] rounded-lg text-sm text-white font-bold outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600" placeholder="공란 시 숨김 처리됩니다" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>글자 크기</span><span>{settings.clinicNameSize}px</span></div>
          <input type="range" min="20" max="80" value={settings.clinicNameSize} onChange={e => setSettings({...settings, clinicNameSize: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>글자 굵기</span><span>{settings.clinicNameWeight}</span></div>
          <input type="range" min="100" max="900" step="100" value={settings.clinicNameWeight} onChange={e => setSettings({...settings, clinicNameWeight: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
      </div>
    </div>
  );

  const renderTitleProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-3">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">메인 타이틀</label>
        <div className="space-y-3">
          <input type="text" value={settings.title} onChange={e => { setSettings({...settings, title: e.target.value}); setAutoMonthInTitle(false); }}
            className="w-full px-3 py-3 bg-[#1a1a1a] border border-[#3f3f3f] rounded-lg text-sm text-white font-bold outline-none focus:ring-1 focus:ring-blue-500" />
          {!autoMonthInTitle && <button onClick={() => setAutoMonthInTitle(true)} className="text-[11px] text-blue-400 font-bold hover:underline hover:text-blue-300">날짜 기반 자동 업데이트로 복원</button>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-[11px] text-slate-300 font-bold">크기 ({settings.titleSize}px)</span>
          <input type="range" min="60" max="250" value={settings.titleSize} onChange={e => setSettings({...settings, titleSize: parseInt(e.target.value)})} className="w-full accent-blue-600" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] text-slate-300 font-bold">굵기 ({settings.titleWeight})</span>
          <input type="range" min="100" max="900" step="100" value={settings.titleWeight} onChange={e => setSettings({...settings, titleWeight: parseInt(e.target.value)})} className="w-full accent-blue-600" />
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-[12px] text-slate-300 font-bold block mb-1">텍스트 컬러</span>
        <div className="grid grid-cols-5 gap-1.5">
          {[...RAINBOW_PALETTE, '#000000'].map(color => (
            <button key={color} onClick={() => setSettings({...settings, titleColor: color})}
              className={cn("h-7 rounded border transition-all", settings.titleColor === color ? "border-white ring-1 ring-white shadow-lg scale-105" : "border-transparent opacity-80 hover:opacity-100")}
              style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-[12px] text-slate-300 font-bold block mb-1">외곽선 설정</span>
        <div className="grid grid-cols-5 gap-1.5">
          {['none', '#e2e8f0', '#000000'].map(color => (
            <button key={color} onClick={() => setSettings({...settings, titleOutline: color})}
              className={cn("h-7 rounded border transition-all flex items-center justify-center", settings.titleOutline === color ? "border-white ring-1 ring-white" : "border-[#3f3f3f] opacity-80 hover:opacity-100")}
              style={{ backgroundColor: color === 'none' ? 'transparent' : color }}>
              {color === 'none' && <X className="w-4 h-4 text-slate-300" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSubtitleProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-3">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">서브 타이틀</label>
        <input type="text" value={settings.subtitle} onChange={e => setSettings({...settings, subtitle: e.target.value})}
          className="w-full px-3 py-3 bg-[#1a1a1a] border border-[#3f3f3f] rounded-lg text-sm text-white font-bold outline-none focus:ring-1 focus:ring-blue-500" />
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>글자 크기</span><span>{settings.subtitleSize}px</span></div>
          <input type="range" min="14" max="60" value={settings.subtitleSize} onChange={e => setSettings({...settings, subtitleSize: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>글자 굵기</span><span>{settings.subtitleWeight}</span></div>
          <input type="range" min="100" max="900" step="100" value={settings.subtitleWeight} onChange={e => setSettings({...settings, subtitleWeight: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
      </div>
    </div>
  );

  const renderCalendarProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <label className="text-[14px] font-black text-white uppercase tracking-widest flex items-center gap-2">
          일정 설정
        </label>
        <div className="p-4 bg-[#363636] rounded-xl space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'normal', label: '정상' },
              { id: 'closed', label: '휴진' },
              { id: 'shortened', label: '단축' },
              { id: 'custom', label: '직접\n입력' },
              { id: 'reset', label: '삭제' }
            ].map(type => (
              <button key={type.id} onClick={() => setSelectedStatus(type.id as any)}
                className={cn("flex-1 px-1 py-1.5 rounded text-[11px] font-black transition-all border whitespace-pre-line leading-tight h-12 flex items-center justify-center text-center",
                  selectedStatus === type.id ? "bg-white text-black border-white" : "bg-[#252525] border-[#4a4a4a] text-slate-400 hover:text-white")}>
                {type.label}
              </button>
            ))}
          </div>
          {selectedStatus === 'custom' && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">직접 입력 문구</span>
              <input type="text" value={customInput.text} onChange={e => setCustomInput({...customInput, text: e.target.value})}
                className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#3f3f3f] rounded text-[12px] text-white outline-none" placeholder="예: 오후 진료" />
            </div>
          )}
          {selectedStatus !== 'normal' && selectedStatus !== 'reset' && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">마커 색상 선택</span>
              <div className="flex flex-wrap gap-2">
                {[...RAINBOW_PALETTE, '#000000'].map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={cn("w-6 h-6 rounded-full border transition-all", selectedColor === c ? "border-white scale-125 ring-2 ring-white/30" : "border-transparent")}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-5">
        <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">배치 설정</label>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>달력 년월 변경</span></div>
            <div className="flex gap-2">
              <select 
                value={currentDate.getFullYear()} 
                onChange={e => {
                  const d = new Date(currentDate);
                  const selectedYear = parseInt(e.target.value);
                  d.setFullYear(selectedYear);
                  // If selected year is current year and month is past, reset to current month
                  if (selectedYear === new Date().getFullYear() && d.getMonth() < new Date().getMonth()) {
                    d.setMonth(new Date().getMonth());
                  }
                  setCurrentDate(d);
                }}
                className="flex-1 px-2 py-2 bg-[#1a1a1a] border border-[#3f3f3f] rounded text-xs font-bold text-white outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[new Date().getFullYear(), new Date().getFullYear() + 1].map(y => <option key={y} value={y}>{y}년</option>)}
              </select>
              <select 
                value={currentDate.getMonth()} 
                onChange={e => {
                  const d = new Date(currentDate);
                  d.setMonth(parseInt(e.target.value));
                  setCurrentDate(d);
                }}
                className="flex-1 px-2 py-2 bg-[#1a1a1a] border border-[#3f3f3f] rounded text-xs font-bold text-white outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Array.from({length: 12}).map((_, i) => {
                  const isPast = currentDate.getFullYear() === new Date().getFullYear() && i < new Date().getMonth();
                  return <option key={i} value={i} disabled={isPast}>{i+1}월</option>;
                })}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>시작 주차 설정</span><span>{settings.startWeekOffset + 1}주 차</span></div>
            <div className="grid grid-cols-6 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map(offset => (
                <button key={offset} disabled={offset >= weeksInMonth} onClick={() => setSettings({...settings, startWeekOffset: offset})}
                  className={cn("py-2.5 rounded text-[11px] font-bold transition-all", settings.startWeekOffset === offset ? "bg-blue-600 text-white" : "bg-[#363636] text-slate-200 disabled:opacity-20 hover:bg-[#3f3f3f]")}>
                  {offset + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>일정 폰트 크기</span><span>{settings.statusTextSize}px</span></div>
            <input type="range" min="16" max="40" value={settings.statusTextSize} onChange={e => setSettings({...settings, statusTextSize: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooterProperties = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">하단 공지 문구</label>
          <button onClick={() => setSettings({...settings, manualFooter: !settings.manualFooter})}
            className={cn("px-2.5 py-1 rounded text-[10px] font-black transition-all", settings.manualFooter ? "bg-blue-600 text-white" : "bg-[#3f3f3f] text-slate-300 hover:text-white ring-1 ring-white/10")}>
            직접 수정
          </button>
        </div>
        <textarea value={settings.footerText} onChange={e => setSettings({...settings, footerText: e.target.value})} disabled={!settings.manualFooter}
          className={cn("w-full h-40 px-3 py-3 bg-[#1a1a1a] border border-[#3f3f3f] rounded-lg text-sm font-medium text-slate-100 outline-none settle-none resize-none shadow-inner", !settings.manualFooter && "opacity-60")} placeholder="일정을 입력하면 문구가 자동 생성됩니다." />
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>폰트 크기</span><span>{settings.footerSize}px</span></div>
          <input type="range" min="14" max="60" value={settings.footerSize} onChange={e => setSettings({...settings, footerSize: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold text-slate-300"><span>폰트 굵기</span><span>{settings.footerWeight}</span></div>
          <input type="range" min="100" max="900" step="100" value={settings.footerWeight} onChange={e => setSettings({...settings, footerWeight: parseInt(e.target.value)})} className="w-full h-1.5 bg-[#3f3f3f] rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
      </div>
    </div>
  );

  const renderDecoProperties = () => {
    const seasonConfig: Array<{
      label: '봄'|'여름'|'가을'|'겨울';
      monthKey: number;
      activeClass: string;
    }> = [
      { label: '봄',  monthKey: 3,  activeClass: 'bg-pink-500/20 text-pink-300 border-pink-400/40' },
      { label: '여름', monthKey: 6,  activeClass: 'bg-green-500/20 text-green-300 border-green-400/40' },
      { label: '가을', monthKey: 9,  activeClass: 'bg-orange-500/20 text-orange-300 border-orange-400/40' },
      { label: '겨울', monthKey: 12, activeClass: 'bg-blue-500/20 text-blue-300 border-blue-400/40' },
    ];
    const currentConfig = seasonConfig.find(s => s.label === activeDecoSeason)!;
    const palette = MONTHLY_DECO_SVGS[currentConfig.monthKey] || [];
    const allDecos = Object.values(MONTHLY_DECO_SVGS).flat();

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* 계절 탭 */}
        <div className="space-y-3">
          <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">요소 삽입</label>
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#1a1a1a] rounded-xl">
            {seasonConfig.map(s => (
              <button
                key={s.label}
                onClick={() => setActiveDecoSeason(s.label)}
                className={cn(
                  "py-2 text-[12px] font-black rounded-lg border transition-all",
                  activeDecoSeason === s.label
                    ? s.activeClass
                    : "border-transparent text-slate-500 hover:text-slate-300"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* SVG 팔레트 */}
        <div className="grid grid-cols-3 gap-2">
          {palette.map(item => (
            <button
              key={item.key}
              onClick={() => {
                const newEl: DecoElement = {
                  id: `deco-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                  svgKey: item.key,
                  x: 10,
                  y: 10,
                  width: 80,
                  height: 80
                };
                setDecoElements(prev => [...prev, newEl]);
                setSelectedDecoId(newEl.id);
              }}
              className="aspect-square bg-[#363636] rounded-xl border border-[#4a4a4a] hover:border-yellow-400/50 hover:bg-[#3f3f3f] transition-all p-2 flex flex-col items-center justify-center gap-1"
            >
              <div className="w-10 h-10" dangerouslySetInnerHTML={{ __html: item.svg }} />
              <span className="text-[10px] font-bold text-slate-300">{item.label}</span>
            </button>
          ))}
        </div>

        {decoElements.length > 0 && (
          <div className="space-y-3">
            <label className="text-[14px] font-black text-slate-100 uppercase tracking-widest block">추가된 요소</label>
            <div className="space-y-2">
              {decoElements.map(el => {
                const info = allDecos.find(s => s.key === el.svgKey);
                return (
                  <div
                    key={el.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
                      selectedDecoId === el.id
                        ? "border-yellow-400/50 bg-yellow-400/5"
                        : "border-[#3f3f3f] bg-[#1a1a1a] hover:border-[#555]"
                    )}
                    onClick={() => setSelectedDecoId(el.id)}
                  >
                    <div className="w-8 h-8 shrink-0" dangerouslySetInnerHTML={{ __html: info?.svg || '' }} />
                    <span className="text-[13px] font-bold text-slate-200 flex-1">{info?.label || el.svgKey}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDecoElements(prev => prev.filter(d => d.id !== el.id));
                        if (selectedDecoId === el.id) setSelectedDecoId(null);
                      }}
                      className="p-1.5 hover:bg-red-500/20 rounded transition-all text-slate-400 hover:text-red-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-slate-300 flex flex-col font-sans overflow-hidden select-none" onMouseUp={handleMouseUp} onMouseMove={handleGlobalMouseMove}>
      <header className="relative h-14 bg-[#2c2c2c] border-b border-[#3f3f3f] flex items-center justify-end px-6 shrink-0 z-30">
        <div className="absolute inset-x-0 h-full flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20"><Palette className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-black tracking-tight text-white uppercase">우리 한의원 진료 안내문 만들기</span>
            </div>
            <div className="h-4 w-px bg-slate-700 mx-2" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-slate-200">{format(currentDate, 'yyyy. MM')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 relative z-10">
          <div className="h-4 w-px bg-slate-700 mx-2" />
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint} 
              disabled={isExporting}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 bg-[#444] hover:bg-[#555] text-white rounded text-xs font-bold transition-all shadow-lg active:scale-95",
                isExporting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> 준비 중...
                </>
              ) : (
                <>
                  <Printer className="w-3.5 h-3.5" /> 인쇄하기
                </>
              )}
            </button>
            <button 
              onClick={handleSavePDF} 
              disabled={isExporting}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition-all shadow-lg active:scale-95",
                isExporting && "opacity-70 cursor-not-allowed"
              )}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> 생성 중...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> PDF 저장
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-[#2c2c2c] border-r border-[#3f3f3f] flex flex-col shrink-0 overflow-y-auto">
          <div className="px-5 py-6 border-b border-[#3f3f3f]"><h3 className="text-[14px] font-black text-slate-100 uppercase tracking-widest">레이어 리스트</h3></div>
          <div className="p-2 space-y-1">
            {[
              { id: 'orientation', label: '용지 방향', icon: <Printer className="w-4 h-4" />, iconColor: 'text-emerald-400' },
              { id: 'theme', label: '테마 / 서체', icon: <Palette className="w-4 h-4" />, iconColor: 'text-purple-400' },
              { id: 'clinicName', label: '한의원 이름', icon: <Type className="w-4 h-4" />, iconColor: 'text-amber-400' },
              { id: 'title', label: '메인 타이틀', icon: <Type className="w-4 h-4" />, iconColor: 'text-red-400' },
              { id: 'subtitle', label: '서브 타이틀', icon: <Type className="w-4 h-4" />, iconColor: 'text-pink-400' },
              { id: 'calendar', label: '진료 일정', icon: <CalendarIcon className="w-4 h-4" />, iconColor: 'text-blue-400' },
              { id: 'footer', label: '하단 문구', icon: <Type className="w-4 h-4" />, iconColor: 'text-slate-300' },
              { id: 'deco', label: '꾸밈 설정', icon: <Sparkles className="w-4 h-4" />, iconColor: 'text-yellow-400' },
            ].map(item => (
              <div key={item.id} className="group relative">
                <button onClick={() => setSelectedElement(prev => prev === item.id ? null : item.id as any)}
                  className={cn("w-full flex items-center gap-3 px-4 py-4 rounded-md text-[14px] font-bold transition-all",
                    selectedElement === item.id ? "bg-blue-600 text-white shadow-lg" : "text-slate-200 hover:bg-[#3f3f3f] hover:text-white")}>
                  <span className={cn(selectedElement === item.id ? "text-white" : cn(item.iconColor, "opacity-100"))}>{item.icon}</span>
                  {item.label}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setGuideTarget(item.id); }}
                  className={cn("absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ring-1 ring-white/10 hover:bg-white/10",
                    selectedElement === item.id ? "text-white/70 hover:text-white" : "text-slate-400 hover:text-slate-200")}
                  title={`${item.label} 도움말`}
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-[#121212] flex items-start justify-center overflow-auto p-12 custom-scrollbar preview-canvas">
          <div className="relative group/canvas">
            <div id="print-area" ref={previewRef}
              className={cn(settings.paperOrientation === 'portrait' ? 'a4-portrait' : 'a4-landscape',
                'print-container shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col bg-white overflow-hidden relative isolate')}
              style={{ fontFamily: settings.fontFamily, padding: settings.paperOrientation === 'landscape' ? '10mm 15mm 5mm 15mm' : '15mm' }}
              onClick={() => setSelectedDecoId(null)}>
              
              <div className="flex-none relative" style={{ zIndex: 2 }}>
                <div onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 'clinicName' ? null : 'clinicName'); }}
                  className={cn("text-center transition-all cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 relative group/elem", selectedElement === 'clinicName' && "ring-2 ring-blue-500 ring-inset")}
                  style={{ fontSize: `${settings.clinicNameSize}px`, color: activeTheme.primary, fontWeight: settings.clinicNameWeight, minHeight: settings.clinicName ? 'auto' : '1.5em' }}>
                  {settings.clinicName || (selectedElement === 'clinicName' && <span className="opacity-30 italic text-sm">(한의원 이름 없음)</span>)}
                </div>

                <h2 onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 'title' ? null : 'title'); }}
                  className={cn("text-center transition-all tracking-tight cursor-pointer hover:bg-blue-50/50 rounded p-1 -m-1 relative group/elem mt-2",
                    settings.paperOrientation === 'landscape' ? "mb-5" : "mb-3", selectedElement === 'title' && "ring-2 ring-blue-500 ring-inset")}
                  style={{ fontSize: `${settings.titleSize}px`, color: settings.titleColor, fontWeight: settings.titleWeight, lineHeight: 1.1,
                    textShadow: settings.titleOutline !== 'none' ? `
                      -1px -1px 0 ${settings.titleOutline},
                       1px -1px 0 ${settings.titleOutline},
                      -1px  1px 0 ${settings.titleOutline},
                       1px  1px 0 ${settings.titleOutline},
                       0px -2px 0 ${settings.titleOutline},
                       0px  2px 0 ${settings.titleOutline},
                      -2px  0px 0 ${settings.titleOutline},
                       2px  0px 0 ${settings.titleOutline},
                      -2px -2px 0 ${settings.titleOutline},
                       2px -2px 0 ${settings.titleOutline},
                      -2px  2px 0 ${settings.titleOutline},
                       2px  2px 0 ${settings.titleOutline},
                      -1px -2px 0 ${settings.titleOutline},
                       1px -2px 0 ${settings.titleOutline},
                      -1px  2px 0 ${settings.titleOutline},
                       1px  2px 0 ${settings.titleOutline}
                    `.replace(/\s+/g, ' ').trim() : 'none' }}>
                  {settings.title}
                </h2>

                <div onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 'subtitle' ? null : 'subtitle'); }}
                  className={cn("mx-auto transition-all cursor-pointer hover:bg-blue-50/50 rounded p-2 -m-1 relative flex items-center justify-center",
                    selectedElement === 'subtitle' && "ring-2 ring-blue-500 ring-inset", settings.paperOrientation === 'landscape' ? "mb-3" : "mb-4")}>
                  <div className="inline-flex px-8 py-2 rounded-full text-white text-center shadow-md"
                    style={{ backgroundColor: activeTheme.primary, fontSize: `${settings.subtitleSize}px`, fontWeight: settings.subtitleWeight }}>
                    {settings.subtitle}
                  </div>
                </div>
              </div>

              <div onClick={(e) => { 
                e.stopPropagation(); 
                if (isDraggingRef.current) return;
                setSelectedElement(prev => prev === 'calendar' ? null : 'calendar'); 
              }}
                className={cn("flex-1 flex flex-col border-2 rounded-2xl overflow-hidden bg-white shadow-sm h-full cursor-default transition-all relative",
                  selectedElement === 'calendar' ? "ring-4 ring-blue-500 ring-opacity-50" : "ring-0")}
                style={{ borderColor: activeTheme.primary, zIndex: 2 }}>
                <div className={cn("calendar-grid border-b-2", settings.paperOrientation === 'landscape' ? "py-1.5" : "py-3")} 
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: activeTheme.headerBg, borderColor: activeTheme.primary }}>
                  {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                    <div key={day} className={cn("text-center font-black text-lg", idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-slate-600")}>{day}</div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col h-full">
                  {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex-1 grid grid-cols-7">
                      {calendarDays.slice(weekIdx * 7, weekIdx * 7 + 7).map((date, idxInWeek) => {
                        const idx = weekIdx * 7 + idxInWeek;
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const status = dayStatuses[dateStr];
                        const holiday = getHoliday(date);
                        const isSameAsPrev = idx % 7 !== 0 && format(calendarDays[idx-1], 'yyyy-MM-dd') && dayStatuses[format(calendarDays[idx-1], 'yyyy-MM-dd')]?.status === status?.status && status?.status !== undefined && status?.status !== 'normal';
                        const isSameAsNext = idx % 7 !== 6 && format(calendarDays[idx+1], 'yyyy-MM-dd') && dayStatuses[format(calendarDays[idx+1], 'yyyy-MM-dd')]?.status === status?.status && status?.status !== undefined && status?.status !== 'normal';
                        
                        return (
                          <div key={dateStr} onMouseDown={(e) => handleMouseDown(e, dateStr)} onMouseEnter={() => handleMouseEnter(dateStr)}
                            onClick={(e) => e.stopPropagation()}
                            className={cn("relative border-b border-r border-slate-100 flex flex-col items-center justify-start cursor-pointer transition-colors hover:bg-slate-50/50",
                              settings.paperOrientation === 'landscape' ? "py-1" : "py-4", idx % 7 === 6 && "border-r-0", !isSameMonth(date, currentDate) && "text-slate-300")}>
                            <div className={cn("relative flex items-center justify-center z-10 w-full", settings.paperOrientation === 'landscape' ? "h-8" : "h-10")}>
                              {status?.status && status.status !== 'normal' && (
                                <div className={cn("absolute inset-y-0 flex transition-all duration-200", 
                                  (!isSameAsPrev && !isSameAsNext) ? (settings.paperOrientation === 'landscape' ? "w-8 left-1/2 -ml-4" : "w-10 left-1/2 -ml-5") : "w-full left-0")}>
                                  <div className={cn("h-full w-full", !isSameAsPrev && "rounded-l-full", !isSameAsNext && "rounded-r-full")}
                                    style={{ backgroundColor: status.customColor || (status.status === 'closed' ? '#ef4444' : status.status === 'shortened' ? '#f59e0b' : '#10b981') }} />
                                </div>
                              )}
                              <span className={cn("relative z-10 font-black tabular-nums transition-all duration-200",
                                settings.paperOrientation === 'landscape' ? "text-[22px]" : "text-[24px]",
                                (status?.status && status.status !== 'normal') ? "text-white" : ((getDay(date) === 0 || !!holiday) ? "text-red-500" : getDay(date) === 6 ? "text-blue-500" : "text-slate-700"))}
                                style={{ textShadow: status?.status && status.status !== 'normal' ? '0 0 4px rgba(0,0,0,0.5)' : 'none' }}>{format(date, 'd')}</span>
                            </div>
                            <div className={cn("mt-1 flex flex-col items-center gap-0.5 z-10 w-full px-1 flex-1 overflow-hidden", settings.paperOrientation === 'landscape' && "mt-0.5")}>
                              {status?.status === 'normal' && (
                                <span className="font-bold text-black text-center break-all leading-tight whitespace-pre-wrap" style={{ fontSize: `${settings.statusTextSize}px` }}>
                                  {settings.paperOrientation === 'portrait' ? '정상\n진료' : '정상진료'}
                                </span>
                              )}
                              {status?.status === 'closed' && <span className="font-black text-center break-all leading-tight" style={{ color: status.customColor || activeTheme.primary, fontSize: `${settings.statusTextSize}px` }}>휴진</span>}
                              {status?.status === 'shortened' && (
                                <span className="font-bold text-center break-all leading-tight whitespace-pre-wrap" style={{ color: status.customColor || activeTheme.accent, fontSize: `${settings.statusTextSize}px` }}>
                                  {settings.paperOrientation === 'portrait' ? '단축\n진료' : '단축진료'}
                                </span>
                              )}
                              {status?.status === 'custom' && <span className="font-bold text-center break-all leading-tight px-1" style={{ color: status.customColor || '#10b981', fontSize: `${settings.statusTextSize}px` }}>{status.customText || '일정'}</span>}
                              {!!holiday && <span className="font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center tracking-tighter mt-1" style={{ fontSize: settings.paperOrientation === 'landscape' ? '14px' : '15px' }}>{holiday.name}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {decoElements.map(el => {
                const allDecos = Object.values(MONTHLY_DECO_SVGS).flat();
                const info = allDecos.find(s => s.key === el.svgKey);
                if (!info) return null;
                const isSelected = selectedDecoId === el.id;
                return (
                  <div
                    key={el.id}
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: isSelected ? 10 : 1 }}
                  >
                    <div
                      className="absolute"
                      style={{ left: el.x, top: el.y, width: el.width, height: el.height, pointerEvents: 'auto', cursor: 'move' }}
                      onMouseDown={(e) => handleDecoMouseDown(e, el.id, 'move')}
                      onClick={(e) => { e.stopPropagation(); setSelectedDecoId(prev => prev === el.id ? null : el.id); }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: info.svg }} style={{ width: '100%', height: '100%' }} />
                      {isSelected && !isExporting && (
                        <>
                          <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none rounded-sm" />
                          <button
                            className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center shadow-md"
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDecoElements(prev => prev.filter(d => d.id !== el.id));
                              setSelectedDecoId(null);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <div
                            className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-500 rounded-sm cursor-nw-resize"
                            onMouseDown={(e) => handleDecoMouseDown(e, el.id, 'resize-nw')}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div
                            className="absolute -bottom-1.5 -left-1.5 w-4 h-4 bg-blue-500 rounded-sm cursor-sw-resize"
                            onMouseDown={(e) => handleDecoMouseDown(e, el.id, 'resize-sw')}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div
                            className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-blue-500 rounded-sm cursor-se-resize"
                            onMouseDown={(e) => handleDecoMouseDown(e, el.id, 'resize-se')}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {settings.footerText && (
                <div onClick={(e) => { e.stopPropagation(); setSelectedElement(prev => prev === 'footer' ? null : 'footer'); }}
                  className={cn("flex-none", settings.paperOrientation === 'landscape' ? "mt-4" : "mt-8", "text-center leading-relaxed whitespace-pre-wrap transition-all cursor-pointer hover:bg-blue-50/50 rounded p-2 -m-1",
                    selectedElement === 'footer' && "ring-2 ring-blue-500 ring-inset")}
                  style={{ fontSize: `${settings.footerSize}px`, fontWeight: settings.footerWeight, color: '#334155', position: 'relative', zIndex: 2 }}>
                  {(() => {
                    const statusColors: Record<string, string> = { '휴진': '#ef4444', '단축진료': '#f59e0b', '정상진료': '#3b82f6' };
                    (Object.values(dayStatuses) as DayStatus[]).forEach(s => { if (s.status === 'custom' && s.customText) statusColors[s.customText] = s.customColor || '#10b981'; });
                    const keys = Object.keys(statusColors).filter(Boolean);
                    if (keys.length === 0) return settings.footerText;
                    const regex = new RegExp(`(${keys.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
                    return settings.footerText.split(regex).map((part, i) => {
                      const color = statusColors[part];
                      return <span key={i} style={color ? { color, fontWeight: 800 } : {}}>{part}</span>;
                    });
                  })()}
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="w-80 bg-[#2c2c2c] border-l border-[#3f3f3f] flex flex-col shrink-0 no-print">
          <div className="px-5 py-6 border-b border-[#3f3f3f] flex items-center justify-between">
            <h3 className="text-[15px] font-black text-white uppercase tracking-widest flex items-center gap-2"><Settings2 className="w-5 h-5 text-blue-500" /> 속성 설정</h3>
            {selectedElement && (
              <div className="flex items-center">
                <span className="text-[12px] font-bold text-blue-400 bg-blue-600/10 px-3 py-1 rounded uppercase tracking-tighter shadow-sm border border-blue-500/20">
                  {(() => {
                    const labels: Record<string, string> = {
                      orientation: '용지 방향',
                      theme: '테마 / 서체',
                      clinicName: '한의원 이름',
                      title: '메인 타이틀',
                      subtitle: '서브 타이틀',
                      calendar: '진료 일정',
                      footer: '하단 문구',
                      deco: '꾸밈 설정'
                    };
                    return labels[selectedElement] || selectedElement;
                  })()}
                </span>
                <button 
                  onClick={() => setSelectedElement(null)}
                  className="ml-2 p-1.5 hover:bg-[#3f3f3f] rounded transition-colors"
                  title="선택 해제"
                >
                  <X className="w-5 h-5 text-slate-300 hover:text-white" />
                </button>
              </div>
            )}
          </div>
          <div className={cn("p-5 custom-scrollbar flex-1 space-y-8", selectedElement ? "overflow-y-auto" : "overflow-hidden")}>
            {selectedElement === 'orientation' && renderOrientationProperties()}
            {selectedElement === 'theme' && renderThemeProperties()}
            {selectedElement === 'clinicName' && renderClinicNameProperties()}
            {selectedElement === 'title' && renderTitleProperties()}
            {selectedElement === 'subtitle' && renderSubtitleProperties()}
            {selectedElement === 'calendar' && renderCalendarProperties()}
            {selectedElement === 'footer' && renderFooterProperties()}
            {selectedElement === 'deco' && renderDecoProperties()}
            {!selectedElement && (
              <div className="h-full flex flex-col items-center text-slate-200 gap-8 mt-16 px-10 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 rounded-full bg-[#363636] flex items-center justify-center shadow-xl border border-[#444]"><Info className="w-10 h-10 text-blue-500" /></div>
                <p className="text-[15px] font-extrabold leading-relaxed tracking-tight break-keep">
                  미리보기 화면에서<br />
                  <span className="text-blue-400">수정하고 싶은 요소</span>를 클릭하여<br />
                  설정을 시작해 보세요.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {guideTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 print:hidden" onClick={() => setGuideTarget(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-[40px] p-10 w-full max-w-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] relative text-slate-800" onClick={e => e.stopPropagation()}>
              <button onClick={() => setGuideTarget(null)} className="absolute top-10 right-10 p-3 hover:bg-slate-100 rounded-full transition-all group font-black"><X className="w-6 h-6 text-slate-400 group-hover:text-slate-900" /></button>
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-200"><HelpCircle className="w-8 h-8 text-white" /></div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight mb-1">{GUIDES[guideTarget]?.title}</h3>
                  <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">Studio Professional Guide</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-inner">
                  <div className="space-y-4">
                    {GUIDES[guideTarget]?.sections.map((section, idx) => {
                      if (section.type === 'p') {
                        return (
                          <p key={idx} className="text-[17px] font-bold leading-[1.8] text-slate-700 break-keep">
                            {section.text}
                          </p>
                        );
                      }
                      const dotColor = section.color === 'blue' ? 'bg-blue-500' : 
                                      section.color === 'emerald' ? 'bg-emerald-500' :
                                      section.color === 'rose' ? 'bg-rose-500' :
                                      section.color === 'indigo' ? 'bg-indigo-500' : 'bg-slate-400';
                      
                      const textColor = section.color === 'blue' ? 'text-blue-600' : 
                                       section.color === 'emerald' ? 'text-emerald-600' :
                                       section.color === 'rose' ? 'text-rose-600' :
                                       section.color === 'indigo' ? 'text-indigo-600' : 'text-blue-600';
                      
                      const decoColor = section.color === 'blue' ? 'decoration-blue-200' : 
                                       section.color === 'emerald' ? 'decoration-emerald-200' :
                                       section.color === 'rose' ? 'decoration-rose-200' :
                                       section.color === 'indigo' ? 'decoration-indigo-200' : 'decoration-blue-100';

                      return (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className={cn("mt-2 w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />
                          <p className="text-[16px] font-bold leading-[1.6] text-slate-600 break-keep">
                            {section.highlight ? (
                              <>
                                {section.text.split(section.highlight).map((part, i, arr) => (
                                  <React.Fragment key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                      <span className={cn("underline underline-offset-4 decoration-2", textColor, decoColor)}>
                                        {section.highlight}
                                      </span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </>
                            ) : section.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex gap-5 items-start p-7 bg-amber-50 rounded-[32px] border border-amber-100/50 shadow-sm">
                  <div className="mt-1.5 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-200"><Info className="w-4 h-4 text-white" /></div>
                  <div className="flex-1">
                    <h5 className="text-[15px] font-black text-amber-900 mb-2 uppercase tracking-wide">Expert Tip</h5>
                    <p className="text-[16px] font-bold text-amber-800/90 leading-relaxed break-keep">
                      {GUIDES[guideTarget]?.tip}
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={() => setGuideTarget(null)} className="w-full mt-10 py-6 bg-slate-900 text-white rounded-[24px] text-xl font-black hover:bg-slate-800 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200">내용을 확인했습니다</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media print {
          body { visibility: hidden; background: white !important; }
          #print-area { visibility: visible; position: absolute; left: 0; top: 0; margin: 0 !important; padding: 15mm !important; box-shadow: none !important; transform: none !important; }
          .a4-portrait { width: 210mm; height: 297mm; }
          .a4-landscape { width: 297mm; height: 210mm; }
        }
      `}</style>
    </div>
  );
}
