import React from 'react';

type CategoryIconProps = {
  id: string;
  className?: string;
  size?: number;
};

const ICONS: Record<string, React.ReactNode> = {
  // 🧴 منظفات - زجاجة ليمون مع فقاعات
  detergents: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
        <linearGradient id="d-liq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd"/>
          <stop offset="100%" stopColor="#3b82f6"/>
        </linearGradient>
        <linearGradient id="d-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
        <filter id="d-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#d-s)">
        {/* الجسم */}
        <rect x="16" y="20" width="24" height="34" rx="6" fill="url(#d-bg)"/>
        <rect x="16" y="20" width="8" height="34" rx="4" fill="white" opacity="0.15"/>
        {/* السائل */}
        <rect x="18" y="34" width="20" height="18" rx="4" fill="url(#d-liq)" opacity="0.5"/>
        {/* الملصق */}
        <rect x="20" y="26" width="16" height="8" rx="2" fill="white" opacity="0.85"/>
        <rect x="22" y="28" width="8" height="1.5" rx="0.75" fill="#3b82f6" opacity="0.6"/>
        <rect x="23" y="31" width="6" height="1" rx="0.5" fill="#3b82f6" opacity="0.4"/>
        {/* الغطاء */}
        <rect x="20" y="12" width="12" height="4" rx="2" fill="url(#d-cap)"/>
        <rect x="22" y="16" width="8" height="4" rx="1" fill="#d97706"/>
        {/* الرقبة */}
        <rect x="24" y="16" width="4" height="4" rx="1" fill="url(#d-bg)"/>
        {/* فقاعات */}
        <circle cx="46" cy="16" r="4" fill="#bfdbfe" opacity="0.7"/>
        <circle cx="46" cy="16" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="50" cy="24" r="3" fill="#dbeafe" opacity="0.6"/>
        <circle cx="48" cy="30" r="2" fill="#eff6ff" opacity="0.5"/>
        <circle cx="12" cy="18" r="2.5" fill="#bfdbfe" opacity="0.5"/>
        <circle cx="10" cy="26" r="1.8" fill="#dbeafe" opacity="0.4"/>
        {/* قطرة */}
        <path d="M46 38c0 0 4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" fill="#60a5fa" opacity="0.8"/>
        <path d="M46 38c0 0 1.5 3 1.5 4.5a1.5 1.5 0 01-3 0c0-1.5 1.5-4.5 1.5-4.5z" fill="white" opacity="0.4"/>
      </g>
    </svg>
  ),

  // 🎨 مستحضرات تجميل - بالت مكياج مفتوح
  cosmetics: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="c-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f472b6"/>
          <stop offset="100%" stopColor="#db2777"/>
        </linearGradient>
        <linearGradient id="c-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a8d4"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
        <filter id="c-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#9d174d" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#c-s)">
        {/* الغطاء المفتوح */}
        <path d="M8 16L12 8h28l4 8z" fill="url(#c-lid)"/>
        <rect x="8" y="16" width="44" height="2" rx="1" fill="#db2777"/>
        {/* الجسم */}
        <rect x="8" y="18" width="44" height="20" rx="4" fill="url(#c-bg)"/>
        <rect x="8" y="18" width="8" height="20" rx="4" fill="white" opacity="0.1"/>
        {/* ألوان المكياج */}
        <circle cx="18" cy="28" r="5" fill="#fbbf24"/>
        <circle cx="18" cy="28" r="3" fill="#fde68a"/>
        <circle cx="30" cy="28" r="5" fill="#fb923c"/>
        <circle cx="30" cy="28" r="3" fill="#fed7aa"/>
        <circle cx="42" cy="28" r="5" fill="#a78bfa"/>
        <circle cx="42" cy="28" r="3" fill="#ddd6fe"/>
        {/* مرآة */}
        <circle cx="48" cy="42" r="8" fill="#fda4af"/>
        <circle cx="48" cy="42" r="6" fill="#fef2f2"/>
        <circle cx="48" cy="42" r="6" fill="white" opacity="0.3"/>
        <rect x="47" y="48" width="2" height="8" rx="1" fill="#92400e"/>
        {/* بريق */}
        <path d="M6 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#fbbf24" opacity="0.8"/>
        <path d="M56 8l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L52.5 10.3l2-.3z" fill="#fbbf24" opacity="0.6"/>
      </g>
    </svg>
  ),

  // 🌸 عطور - زجاجة عطر فخمة
  perfumes: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="p-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd"/>
          <stop offset="50%" stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#6d28d9"/>
        </linearGradient>
        <linearGradient id="p-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a"/>
          <stop offset="100%" stopColor="#d97706"/>
        </linearGradient>
        <linearGradient id="p-liq" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ddd6fe"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
        <filter id="p-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5b21b6" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#p-s)">
        {/* الغطاء */}
        <rect x="22" y="4" width="12" height="5" rx="2" fill="url(#p-cap)"/>
        <rect x="22" y="4" width="5" height="5" rx="2" fill="white" opacity="0.2"/>
        {/* الرقبة */}
        <rect x="24" y="9" width="8" height="5" rx="2" fill="url(#p-bg)"/>
        {/* الجسم */}
        <path d="M14 14h28v38a8 8 0 01-8 8h-12a8 8 0 01-8-8V14z" fill="url(#p-bg)"/>
        {/* السائل */}
        <path d="M16 28h24v22a8 8 0 01-8 8h-8a8 8 0 01-8-8V28z" fill="url(#p-liq)" opacity="0.35"/>
        {/* لمعة */}
        <rect x="14" y="14" width="6" height="38" rx="3" fill="white" opacity="0.15"/>
        {/* شعار */}
        <circle cx="28" cy="34" r="4" fill="white" opacity="0.15"/>
        <path d="M26 34h4v-2a2 2 0 00-2-2 2 2 0 00-2 2v2z" fill="white" opacity="0.1"/>
        {/* وردة */}
        <circle cx="6" cy="16" r="5" fill="#fda4af" opacity="0.9"/>
        <circle cx="6" cy="16" r="3" fill="#fecdd3" opacity="0.7"/>
        <circle cx="6" cy="16" r="1.5" fill="white" opacity="0.4"/>
        <path d="M6 21c-1 2-1.5 4-1 7" stroke="#4ade80" strokeWidth="1.5" fill="none"/>
        <path d="M5 24c-2 0-3.5-1-3.5-2.5" stroke="#4ade80" strokeWidth="1" fill="none"/>
        {/* بخاخ */}
        <circle cx="52" cy="8" r="2.5" fill="#ddd6fe" opacity="0.7"/>
        <circle cx="54" cy="14" r="1.8" fill="#ede9fe" opacity="0.5"/>
        <circle cx="50" cy="5" r="1.5" fill="#f5f3ff" opacity="0.4"/>
      </g>
    </svg>
  ),

  // 🫧 صابون - صابونة مع رغوة
  soap: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="s-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
        <linearGradient id="s-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#99f6e4"/>
          <stop offset="100%" stopColor="#5eead4"/>
        </linearGradient>
        <filter id="s-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#065f46" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#s-s)">
        {/* صابونة */}
        <rect x="8" y="30" width="36" height="18" rx="8" fill="url(#s-bg)"/>
        <rect x="10" y="22" width="28" height="14" rx="6" fill="url(#s-top)"/>
        <rect x="10" y="22" width="8" height="14" rx="4" fill="white" opacity="0.15"/>
        <path d="M20 32h16" stroke="white" strokeWidth="1" opacity="0.3"/>
        <path d="M18 36h20" stroke="white" strokeWidth="0.8" opacity="0.2"/>
        {/* رغوة */}
        <circle cx="44" cy="12" r="6" fill="white" opacity="0.9"/>
        <circle cx="44" cy="12" r="2.5" fill="white" opacity="0.4"/>
        <circle cx="36" cy="10" r="5" fill="white" opacity="0.85"/>
        <circle cx="50" cy="8" r="4" fill="white" opacity="0.7"/>
        <circle cx="40" cy="6" r="3.5" fill="white" opacity="0.6"/>
        <circle cx="32" cy="8" r="2.5" fill="white" opacity="0.5"/>
        <circle cx="52" cy="18" r="2" fill="#ccfbf1" opacity="0.6"/>
        {/* لمعان الفقاعات */}
        <circle cx="44" cy="10" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="36" cy="8" r="1.2" fill="white" opacity="0.4"/>
        {/* نجوم */}
        <path d="M54 28l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#fbbf24" opacity="0.7"/>
        <path d="M6 14l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#2dd4bf" opacity="0.6"/>
      </g>
    </svg>
  ),

  // ✂️ شعر - مقص مع خصلة شعر
  hair: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="h-blade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#d97706"/>
        </linearGradient>
        <linearGradient id="h-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b"/>
          <stop offset="100%" stopColor="#334155"/>
        </linearGradient>
        <linearGradient id="h-hl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" opacity="0.6"/>
          <stop offset="100%" stopColor="#f97316" opacity="0"/>
        </linearGradient>
        <filter id="h-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#92400e" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#h-s)">
        {/* خصلة شعر */}
        <path d="M8 8c0 12 4 20 8 28c2 4 4 8 3 14" stroke="url(#h-hair)" strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M16 8c0 12 4 20 8 28c2 4 4 8 3 14" stroke="url(#h-hair)" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path d="M24 8c0 12 4 20 8 28c2 4 4 8 3 14" stroke="url(#h-hair)" strokeWidth="7" fill="none" strokeLinecap="round"/>
        {/* خصلات برتقالي */}
        <path d="M12 10c1 8 4 16 6 22" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.4"/>
        <path d="M20 10c1 8 4 16 6 22" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3"/>
        {/* لمعة */}
        <path d="M10 12c1 6 3 12 4 18" stroke="white" strokeWidth="1" fill="none" opacity="0.15"/>
        <path d="M18 12c1 6 3 12 4 18" stroke="white" strokeWidth="1" fill="none" opacity="0.15"/>
        {/* مقص */}
        <g transform="translate(38, 20) rotate(20)">
          {/* شفرة 1 */}
          <path d="M0 0L-8 20L-4 22L4 4z" fill="url(#h-blade)"/>
          <circle cx="-6" cy="22" r="4" fill="none" stroke="#d97706" strokeWidth="2"/>
          {/* شفرة 2 */}
          <path d="M0 0L8 20L4 22L-4 4z" fill="url(#h-blade)"/>
          <circle cx="6" cy="22" r="4" fill="none" stroke="#d97706" strokeWidth="2"/>
          {/* برغي */}
          <circle cx="0" cy="4" r="2" fill="#92400e"/>
        </g>
        {/* نجوم */}
        <path d="M54 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L50.5 8.3l2-.3z" fill="#fbbf24" opacity="0.7"/>
      </g>
    </svg>
  ),

  // 💆 بشرة - وجه مع قطرة كريم
  skin: (
    <svg viewBox="0 0 64 64" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id="k-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
        <linearGradient id="k-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="k-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <linearGradient id="k-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185"/>
          <stop offset="100%" stopColor="#e11d48"/>
        </linearGradient>
        <filter id="k-s"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#155e75" floodOpacity="0.3"/></filter>
      </defs>
      <g filter="url(#k-s)">
        {/* الوجه */}
        <ellipse cx="28" cy="28" rx="16" ry="18" fill="url(#k-face)"/>
        <ellipse cx="28" cy="28" rx="16" ry="18" fill="url(#k-glow)"/>
        {/* الشعر */}
        <ellipse cx="28" cy="14" rx="16" ry="10" fill="#78350f"/>
        <path d="M12 14c0-8 6-14 16-14s16 6 16 14c0 0-3-5-8-7c-4-1-8-1-12 0c-5 2-9 6-12 7z" fill="#92400e"/>
        {/* العيون */}
        <ellipse cx="22" cy="26" rx="3" ry="2.5" fill="white"/>
        <ellipse cx="34" cy="26" rx="3" ry="2.5" fill="white"/>
        <ellipse cx="22.5" cy="26.5" rx="2" ry="2" fill="#1e293b"/>
        <ellipse cx="34.5" cy="26.5" rx="2" ry="2" fill="#1e293b"/>
        <circle cx="21.5" cy="25.5" r="0.8" fill="white" opacity="0.9"/>
        <circle cx="33.5" cy="25.5" r="0.8" fill="white" opacity="0.9"/>
        {/* الرموش */}
        <path d="M19 23c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none"/>
        <path d="M31 23c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none"/>
        {/* الحواجب */}
        <path d="M18.5 21.5c1.5-2 4.5-2 6 0" stroke="#78350f" strokeWidth="1.2" fill="none"/>
        <path d="M31.5 21.5c1.5-2 4.5-2 6 0" stroke="#78350f" strokeWidth="1.2" fill="none"/>
        {/* البلاش */}
        <circle cx="18" cy="30" r="3" fill="#fda4af" opacity="0.5"/>
        <circle cx="38" cy="30" r="3" fill="#fda4af" opacity="0.5"/>
        {/* الشفايف */}
        <path d="M24 34c1.5 2 6 2 8 0" stroke="url(#k-lip)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* الأنف */}
        <path d="M27 30.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none"/>
        {/* قطرة كريم */}
        <path d="M52 30c0 0 5 6 5 10a5 5 0 01-10 0c0-4 5-10 5-10z" fill="url(#k-drop)"/>
        <path d="M52 30c0 0 2 4 2 6a2 2 0 01-4 0c0-2 2-6 2-6z" fill="white" opacity="0.4"/>
        {/* ورقة صبار */}
        <path d="M50 52c-3-5-8-4-8-1s5 5 8 1z" fill="#4ade80" opacity="0.7"/>
        {/* نجوم توهج */}
        <path d="M6 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#22d3ee" opacity="0.9"/>
        <path d="M56 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L52.5 8.3l2-.3z" fill="#22d3ee" opacity="0.7"/>
      </g>
    </svg>
  ),
};

export default function CategoryIcon({ id, className, size = 36 }: CategoryIconProps) {
  return ICONS[id] ?? null;
}
