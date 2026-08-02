import React from 'react';

type CategoryIconProps = {
  id: string;
  className?: string;
  size?: number;
};

const LABELS: Record<string, string> = {
  detergents: 'المنظفات',
  cosmetics: 'مستحضرات التجميل',
  perfumes: 'العطور',
  soap: 'الصابون',
  hair: 'العناية بالشعر',
  skin: 'العناية بالبشرة',
};

const ICONS: Record<string, React.ReactNode> = {
  // بنت بتغسل صحون مع فقاعات ولمعان
  detergents: (
    <g>
      <defs>
        <linearGradient id="d-bottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="d-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="d-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="d-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#d-sh)">
        {/* زجاجة المنظف */}
        <rect x="16" y="4" width="10" height="5" rx="2" fill="#1e40af" />
        <rect x="18" y="9" width="6" height="3" rx="1" fill="#2563eb" />
        <rect x="12" y="12" width="18" height="24" rx="5" fill="url(#d-bottle)" />
        <rect x="15" y="17" width="12" height="8" rx="2" fill="white" opacity="0.9" />
        <rect x="17" y="19" width="8" height="1.5" rx="0.75" fill="#3b82f6" opacity="0.5" />
        <rect x="18" y="22" width="6" height="1" rx="0.5" fill="#3b82f6" opacity="0.3" />
        <path d="M14 12h4v24a5 5 0 01-4-5V12z" fill="url(#d-shine)" />
        {/* فقاعات كتير */}
        <circle cx="34" cy="8" r="3.5" fill="#bfdbfe" opacity="0.7" />
        <circle cx="34" cy="8" r="1.5" fill="white" opacity="0.4" />
        <circle cx="38" cy="14" r="2.5" fill="#dbeafe" opacity="0.6" />
        <circle cx="36" cy="20" r="2" fill="#eff6ff" opacity="0.5" />
        <circle cx="40" cy="10" r="1.8" fill="#eff6ff" opacity="0.4" />
        <circle cx="6" cy="10" r="2.5" fill="#bfdbfe" opacity="0.5" />
        <circle cx="8" cy="16" r="1.8" fill="#dbeafe" opacity="0.4" />
        {/* لمعان نظافة */}
        <path d="M4 6l2 3 3-1-2 3 1 3-3-2-3 2 1-3-2-3 3 1z" fill="#fbbf24" opacity="0.8" />
        <path d="M38 4l1 2 2-.5-1 2 .5 2-2-1-2 1 .5-2-1-2 2 .5z" fill="#fbbf24" opacity="0.6" />
      </g>
    </g>
  ),

  // بنت وشه حلو مع أحمر شفاه وريم
  cosmetics: (
    <g>
      <defs>
        <linearGradient id="c-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="c-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="c-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="c-blush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
        </linearGradient>
        <filter id="c-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#881337" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#c-sh)">
        {/* شعر */}
        <ellipse cx="24" cy="16" rx="14" ry="15" fill="url(#c-hair)" />
        <path d="M10 16c0-8 6-14 14-14s14 6 14 14c0 0-2-4-6-5s-8 0-12 0-8 2-10 5z" fill="#a16207" />
        <path d="M10 18c-2 6-1 14 3 18" stroke="#78350f" strokeWidth="2" fill="none" />
        <path d="M38 18c2 6 1 14-3 18" stroke="#78350f" strokeWidth="2" fill="none" />
        {/* وش */}
        <ellipse cx="24" cy="22" rx="11" ry="12" fill="url(#c-face)" />
        {/* عيون */}
        <ellipse cx="19" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <ellipse cx="29" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <circle cx="18" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        <circle cx="28" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        {/* رموش */}
        <path d="M16 18c1-1 3-1 4 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M26 18c1-1 3-1 4 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        {/* حواجب */}
        <path d="M16 16c1.5-1.5 4-1.5 5.5 0" stroke="#78350f" strokeWidth="1" fill="none" />
        <path d="M26 16c1.5-1.5 4-1.5 5.5 0" stroke="#78350f" strokeWidth="1" fill="none" />
        {/* بلاش */}
        <circle cx="16" cy="24" r="3" fill="url(#c-blush)" opacity="0.5" />
        <circle cx="32" cy="24" r="3" fill="url(#c-blush)" opacity="0.5" />
        {/* شفايف */}
        <path d="M20 27c1.5-1.5 6-1.5 8 0c-1.5 2-6 2-8 0z" fill="url(#c-lip)" />
        <path d="M22 27c1-0.5 3-0.5 4 0" stroke="white" strokeWidth="0.5" opacity="0.4" />
        {/* أنف */}
        <path d="M23 23.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none" />
        {/* أحمر شفاه جنب */}
        <rect x="36" y="28" width="5" height="9" rx="1.5" fill="#9f1239" />
        <path d="M37 28h3v-4a1.5 1.5 0 00-1.5-1.5 1.5 1.5 0 00-1.5 1.5v4z" fill="url(#c-lip)" />
        <rect x="36" y="28" width="5" height="1" rx="0.5" fill="#fbbf24" opacity="0.7" />
        {/* لمعة */}
        <path d="M14 14h4v10a8 8 0 01-4-7V14z" fill="white" opacity="0.1" />
      </g>
    </g>
  ),

  // زجاجة عطر فخمة مع وردة
  perfumes: (
    <g>
      <defs>
        <linearGradient id="p-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="p-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="p-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="p-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <filter id="p-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#5b21b6" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#p-sh)">
        {/* غطاء ذهبي */}
        <rect x="18" y="2" width="12" height="5" rx="2" fill="url(#p-cap)" />
        <rect x="18" y="2" width="6" height="5" rx="2" fill="url(#p-shine)" opacity="0.4" />
        <rect x="20" y="7" width="8" height="3" rx="1" fill="#b45309" />
        {/* عنق */}
        <rect x="21" y="10" width="6" height="5" rx="1.5" fill="url(#p-body)" />
        {/* الجسم - شكل فخم */}
        <path d="M12 15h24v24a6 6 0 01-6 6H18a6 6 0 01-6-6V15z" fill="url(#p-body)" />
        {/* السائل */}
        <path d="M14 28a5 5 0 015-5h10a5 5 0 015 5v8a6 6 0 01-6 6h-8a6 6 0 01-6-6v-8z" fill="#ddd6fe" opacity="0.3" />
        {/* لمعة */}
        <path d="M14 15h5v24a6 6 0 01-5-6V15z" fill="url(#p-shine)" />
        {/* وردة */}
        <circle cx="6" cy="12" r="5" fill="url(#p-rose)" opacity="0.8" />
        <circle cx="6" cy="12" r="3" fill="#fda4af" opacity="0.6" />
        <circle cx="6" cy="12" r="1.5" fill="#fecdd3" opacity="0.5" />
        <path d="M6 17c-1 2-2 4-1 6" stroke="#16a34a" strokeWidth="1.5" fill="none" />
        <path d="M5 19c-2 0-4-1-4-3" stroke="#16a34a" strokeWidth="1" fill="none" />
        {/* رشاش */}
        <circle cx="38" cy="6" r="2" fill="#ddd6fe" opacity="0.7" />
        <circle cx="40" cy="12" r="1.5" fill="#ede9fe" opacity="0.5" />
        <circle cx="36" cy="3" r="1.2" fill="#f5f3ff" opacity="0.4" />
      </g>
    </g>
  ),

  // صابونة مع رغوة ويد بتغسل
  soap: (
    <g>
      <defs>
        <linearGradient id="s-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="s-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#99f6e4" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id="s-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="s-hand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <filter id="s-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#065f46" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#s-sh)">
        {/* صابونة */}
        <rect x="6" y="22" width="28" height="16" rx="7" fill="url(#s-body)" />
        <rect x="9" y="14" width="22" height="12" rx="6" fill="url(#s-top)" />
        <path d="M11 14h6v12a6 6 0 01-6-6V14z" fill="url(#s-shine)" />
        <path d="M16 24h14" stroke="white" strokeWidth="1" opacity="0.3" />
        <path d="M14 28h18" stroke="white" strokeWidth="0.8" opacity="0.2" />
        {/* رغوة كتير */}
        <circle cx="34" cy="8" r="5" fill="white" opacity="0.85" />
        <circle cx="28" cy="6" r="4" fill="white" opacity="0.7" />
        <circle cx="38" cy="5" r="3.5" fill="white" opacity="0.6" />
        <circle cx="31" cy="3" r="2.5" fill="white" opacity="0.5" />
        <circle cx="40" cy="14" r="2" fill="#ccfbf1" opacity="0.6" />
        <circle cx="24" cy="4" r="2" fill="white" opacity="0.4" />
        <circle cx="33" cy="6" r="1.5" fill="white" opacity="0.3" />
        {/* يد بتغسل */}
        <path d="M4 30c-1 2 0 6 2 8c1 1 3 0 3-2c0-2-1-4 0-6" fill="url(#s-hand)" opacity="0.8" />
        <path d="M3 32c0 1 0 3 1 4" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* لمعان نظافة */}
        <path d="M38 26l2 3 3-1-2 3 1 3-3-2-3 2 1-3-2-3 3 1z" fill="#fbbf24" opacity="0.7" />
        <path d="M6 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#fbbf24" opacity="0.6" />
      </g>
    </g>
  ),

  // بنت وشعرها ناعم وطويل
  hair: (
    <g>
      <defs>
        <linearGradient id="h-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="h-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="h-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" opacity="0.6" />
          <stop offset="100%" stopColor="#f97316" opacity="0" />
        </linearGradient>
        <linearGradient id="h-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="h-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#9a3412" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#h-sh)">
        {/* شعر طويل ناعم - خلف الوش */}
        <path d="M8 18c0-10 7-16 16-16s16 6 16 16c0 0-2-6-8-8c-4-1-8-1-12 0c-6 2-10 6-12 8z" fill="url(#h-hair)" />
        {/* شعر طالع من الجنب */}
        <path d="M8 18c-2 4-3 12-2 20c0 2 2 3 3 2c1-2 1-6 1-10c0-4 0-8-2-12z" fill="url(#h-hair)" />
        <path d="M40 18c2 4 3 12 2 20c0 2-2 3-3 2c-1-2-1-6-1-10c0-4 0-8 2-12z" fill="url(#h-hair)" />
        {/* شعر نازل على الكتف */}
        <path d="M8 18c-1 6-2 16 0 24c0.5 2 2 2 2.5 0c1-4 1-10 0-16c0-4-1-6-2.5-8z" fill="url(#h-hair)" />
        <path d="M40 18c1 6 2 16 0 24c-0.5 2-2 2-2.5 0c-1-4-1-10 0-16c0-4 1-6 2.5-8z" fill="url(#h-hair)" />
        {/* لمعة شعر */}
        <path d="M12 8c3-2 8-4 12-4s9 2 12 4c-2-3-7-5-12-5s-10 2-12 5z" fill="url(#h-highlight)" />
        <path d="M14 10c2-1 6-3 10-3" stroke="#f97316" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M10 22c-1 3-1 8 0 12" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15" />
        <path d="M38 22c1 3 1 8 0 12" stroke="white" strokeWidth="0.8" fill="none" opacity="0.15" />
        {/* وش */}
        <ellipse cx="24" cy="22" rx="11" ry="12" fill="url(#h-face)" />
        {/* عيون */}
        <ellipse cx="19" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <ellipse cx="29" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <circle cx="18" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        <circle cx="28" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        {/* رموش */}
        <path d="M16 18c1.5-1 3-1 4.5 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M26 18c1.5-1 3-1 4.5 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        {/* حواجب */}
        <path d="M16 16c1.5-1.5 4-1.5 5.5 0" stroke="#0f172a" strokeWidth="1" fill="none" />
        <path d="M26.5 16c1.5-1.5 4-1.5 5.5 0" stroke="#0f172a" strokeWidth="1" fill="none" />
        {/* بلاش */}
        <circle cx="16" cy="24" r="3" fill="#fda4af" opacity="0.4" />
        <circle cx="32" cy="24" r="3" fill="#fda4af" opacity="0.4" />
        {/* شفايف ابتسامة */}
        <path d="M20 27c1.5 2 6 2 8 0" stroke="#e11d48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* أنف */}
        <path d="M23 23.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none" />
        {/* خصلات شعر برتقالي */}
        <path d="M10 30c-1 4-1 8 0 12" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M38 30c1 4 1 8 0 12" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3" />
      </g>
    </g>
  ),

  // بنت وشه يلمع مع قطرة كريم
  skin: (
    <g>
      <defs>
        <linearGradient id="k-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="k-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="k-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="k-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="k-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#155e75" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#k-sh)">
        {/* شعر */}
        <ellipse cx="24" cy="14" rx="13" ry="14" fill="url(#k-hair)" />
        <path d="M11 14c0-8 6-13 13-13s13 5 13 13c0 0-2-4-6-5s-7 0-10 0-8 2-10 5z" fill="#b45309" />
        {/* وش */}
        <ellipse cx="24" cy="22" rx="11" ry="12" fill="url(#k-face)" />
        {/* توهج البشرة */}
        <ellipse cx="24" cy="22" rx="11" ry="12" fill="url(#k-glow)" />
        {/* عيون */}
        <ellipse cx="19" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <ellipse cx="29" cy="20" rx="2.5" ry="2" fill="#1e293b" />
        <circle cx="18" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        <circle cx="28" cy="19.5" r="0.8" fill="white" opacity="0.8" />
        {/* رموش */}
        <path d="M16 18c1.5-1 3-1 4.5 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        <path d="M26 18c1.5-1 3-1 4.5 0" stroke="#1e293b" strokeWidth="0.8" fill="none" />
        {/* حواجب */}
        <path d="M16 16c1.5-1.5 4-1.5 5.5 0" stroke="#92400e" strokeWidth="1" fill="none" />
        <path d="M26.5 16c1.5-1.5 4-1.5 5.5 0" stroke="#92400e" strokeWidth="1" fill="none" />
        {/* بلاش */}
        <circle cx="16" cy="24" r="3" fill="#fda4af" opacity="0.4" />
        <circle cx="32" cy="24" r="3" fill="#fda4af" opacity="0.4" />
        {/* شفايف ابتسامة */}
        <path d="M20 27c1.5 2 6 2 8 0" stroke="#e11d48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* أنف */}
        <path d="M23 23.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none" />
        {/* لمعان البشرة - نجوم */}
        <path d="M5 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#22d3ee" opacity="0.8" />
        <path d="M40 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2-1.5-1.5 2-.3z" fill="#22d3ee" opacity="0.6" />
        {/* قطرة كريم */}
        <path d="M8 36c0 0 4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" fill="url(#k-drop)" />
        <path d="M8 36c0 0 1.5 3 1.5 4.5a1.5 1.5 0 01-3 0c0-1.5 1.5-4.5 1.5-4.5z" fill="white" opacity="0.4" />
        {/* ورقة */}
        <path d="M38 36c-2-4-6-3-6-1s4 4 6 1z" fill="#34d399" opacity="0.6" />
      </g>
    </g>
  ),
};

export default function CategoryIcon({ id, className, size = 36 }: CategoryIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={LABELS[id] ?? id}
      fill="none"
    >
      {ICONS[id] ?? null}
    </svg>
  );
}
