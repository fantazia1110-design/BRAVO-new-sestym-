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
  // 🧴 زجاجة منظف مع فقاعات ولمعان
  detergents: (
    <g>
      <defs>
        <linearGradient id="det-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="det-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="det-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="det-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="det-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#1e3a8a" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#det-shadow)">
        {/* غطاء ذهبي */}
        <rect x="17" y="2" width="14" height="5" rx="2.5" fill="url(#det-cap)" />
        <rect x="19" y="7" width="10" height="3" rx="1" fill="#92400e" />
        {/* رقبة */}
        <rect x="20" y="10" width="8" height="5" rx="2" fill="url(#det-body)" />
        {/* جسم الزجاجة */}
        <path d="M12 15h24v26a6 6 0 01-6 6H18a6 6 0 01-6-6V15z" fill="url(#det-body)" />
        {/* السائل */}
        <path d="M14 28h20v11a6 6 0 01-6 6h-8a6 6 0 01-6-6V28z" fill="url(#det-liquid)" opacity="0.5" />
        {/* ملصق */}
        <rect x="16" y="19" width="16" height="9" rx="2" fill="white" opacity="0.9" />
        <rect x="18" y="21" width="10" height="1.5" rx="0.75" fill="#3b82f6" opacity="0.6" />
        <rect x="19" y="24" width="8" height="1" rx="0.5" fill="#3b82f6" opacity="0.4" />
        {/* لمعة */}
        <path d="M13 15h5v26a6 6 0 01-5-6V15z" fill="url(#det-shine)" />
        {/* قطرة */}
        <path d="M38 20c0 0 3 4 3 7a3 3 0 01-6 0c0-3 3-7 3-7z" fill="#60a5fa" opacity="0.9" />
        <path d="M38 20c0 0 1 2.5 1 4a1 1 0 01-2 0c0-1.5 1-4 1-4z" fill="white" opacity="0.5" />
        {/* فقاعات */}
        <circle cx="6" cy="12" r="3" fill="#bfdbfe" opacity="0.7" />
        <circle cx="6" cy="12" r="1.2" fill="white" opacity="0.5" />
        <circle cx="42" cy="8" r="2.5" fill="#dbeafe" opacity="0.6" />
        <circle cx="42" cy="8" r="1" fill="white" opacity="0.4" />
        <circle cx="4" cy="22" r="2" fill="#eff6ff" opacity="0.5" />
        <circle cx="44" cy="32" r="1.8" fill="#dbeafe" opacity="0.5" />
        {/* نجوم لمعان */}
        <path d="M4 4l1.5 3 3 .5-2 2 .5 3-3-1.5L1 12.5l.5-3-2-2 3-.5z" fill="#fbbf24" opacity="0.8" />
        <path d="M42 4l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L39 6.3l2-.3z" fill="#fbbf24" opacity="0.6" />
      </g>
    </g>
  ),

  // 💄 أحمر شفاه ومرآة وبريق
  cosmetics: (
    <g>
      <defs>
        <linearGradient id="cos-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <linearGradient id="cos-tube" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#404040" />
        </linearGradient>
        <linearGradient id="cos-mirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="cos-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
        <filter id="cos-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#881337" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#cos-shadow)">
        {/* مرآة */}
        <circle cx="14" cy="18" r="12" fill="url(#cos-mirror)" />
        <circle cx="14" cy="18" r="10" fill="#fef2f2" />
        <circle cx="14" cy="18" r="10" fill="url(#cos-glass)" />
        <path d="M14 30c-1 4-2 8-1 12" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* انعكاس شفايف في المرآة */}
        <path d="M9 18c1.5-2 4-2 5.5 0c-1.5 2.5-4 2.5-5.5 0z" fill="url(#cos-lip)" opacity="0.6" />
        {/* أحمر شفاه */}
        <rect x="30" y="22" width="7" height="18" rx="2" fill="url(#cos-tube)" />
        <path d="M30 22h7v-6a3.5 3.5 0 00-3.5-3.5 3.5 3.5 0 00-3.5 3.5v6z" fill="url(#cos-lip)" />
        <rect x="30" y="22" width="7" height="1.5" rx="0.75" fill="#fbbf24" opacity="0.8" />
        <path d="M31 16h3v-2a1.5 1.5 0 00-1.5-1.5 1.5 1.5 0 00-1.5 1.5v2z" fill="white" opacity="0.3" />
        {/* لمعة الأنبوبة */}
        <rect x="31" y="24" width="1.5" height="14" rx="0.75" fill="white" opacity="0.15" />
        {/* بريق */}
        <path d="M4 6l1.5 3 3 .5-2 2 .5 3-3-1.5L1 14.5l.5-3-2-2 3-.5z" fill="#fb7185" opacity="0.8" />
        <path d="M42 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L38.5 8.3l2-.3z" fill="#fbbf24" opacity="0.7" />
        <path d="M38 40l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L34.5 42.3l2-.3z" fill="#fb7185" opacity="0.5" />
      </g>
    </g>
  ),

  // 🌸 زجاجة عطر فخمة مع ورد وبخاخ
  perfumes: (
    <g>
      <defs>
        <linearGradient id="prf-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="prf-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prf-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="prf-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="prf-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="prf-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <filter id="prf-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#5b21b6" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#prf-shadow)">
        {/* غطاء ذهبي فخم */}
        <path d="M17 1h14v4a2 2 0 01-2 2h-10a2 2 0 01-2-2V1z" fill="url(#prf-cap)" />
        <rect x="18" y="1" width="6" height="4" rx="1" fill="url(#prf-shine)" opacity="0.4" />
        {/* رقبة */}
        <rect x="20" y="7" width="8" height="5" rx="2" fill="url(#prf-body)" />
        {/* جسم الزجاجة - شكل فخم */}
        <path d="M10 12h28v28a8 8 0 01-8 8h-12a8 8 0 01-8-8V12z" fill="url(#prf-body)" />
        {/* السائل */}
        <path d="M12 24h24v14a8 8 0 01-8 8h-8a8 8 0 01-8-8V24z" fill="url(#prf-liquid)" opacity="0.35" />
        {/* لمعة */}
        <path d="M12 12h5v28a8 8 0 01-5-7V12z" fill="url(#prf-shine)" />
        {/* شعار على الزجاجة */}
        <path d="M21 28h6v-3a3 3 0 00-3-3 3 3 0 00-3 3v3z" fill="white" opacity="0.2" />
        <circle cx="24" cy="32" r="3" fill="white" opacity="0.15" />
        {/* وردة جميلة */}
        <circle cx="6" cy="14" r="5.5" fill="url(#prf-rose)" opacity="0.9" />
        <circle cx="6" cy="14" r="3.5" fill="#fda4af" opacity="0.7" />
        <circle cx="6" cy="14" r="1.8" fill="#fecdd3" opacity="0.5" />
        <path d="M6 19.5c-1 2-2 5-1 8" stroke="url(#prf-leaf)" strokeWidth="1.5" fill="none" />
        <path d="M5 22c-2.5 0-4.5-1.5-4.5-3.5" stroke="url(#prf-leaf)" strokeWidth="1.2" fill="none" />
        <path d="M7 24c2 0 3.5-1 3.5-2.5" stroke="url(#prf-leaf)" strokeWidth="1" fill="none" />
        {/* بخاخ عطر */}
        <circle cx="40" cy="6" r="2.5" fill="#ddd6fe" opacity="0.8" />
        <circle cx="42" cy="12" r="1.8" fill="#ede9fe" opacity="0.6" />
        <circle cx="38" cy="3" r="1.5" fill="#f5f3ff" opacity="0.5" />
        <circle cx="44" cy="10" r="1.2" fill="#ede9fe" opacity="0.4" />
        {/* نجوم */}
        <path d="M42 38l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L38.5 40.3l2-.3z" fill="#8b5cf6" opacity="0.6" />
      </g>
    </g>
  ),

  // 🫧 صابونة مع رغوة ولمعان
  soap: (
    <g>
      <defs>
        <linearGradient id="sop-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="sop-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#99f6e4" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
        <linearGradient id="sop-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="sop-foam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#ccfbf1" />
        </linearGradient>
        <filter id="sop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#065f46" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#sop-shadow)">
        {/* صابونة */}
        <rect x="6" y="24" width="30" height="16" rx="8" fill="url(#sop-body)" />
        <rect x="9" y="16" width="24" height="12" rx="6" fill="url(#sop-top)" />
        <path d="M11 16h6v12a6 6 0 01-6-6V16z" fill="url(#sop-shine)" />
        <path d="M18 28h10" stroke="white" strokeWidth="1" opacity="0.3" />
        <path d="M15 32h16" stroke="white" strokeWidth="0.8" opacity="0.2" />
        <path d="M17 36h12" stroke="white" strokeWidth="0.6" opacity="0.15" />
        {/* رغوة كتير */}
        <circle cx="34" cy="10" r="5.5" fill="url(#sop-foam)" opacity="0.9" />
        <circle cx="28" cy="8" r="4.5" fill="white" opacity="0.85" />
        <circle cx="38" cy="7" r="3.5" fill="white" opacity="0.7" />
        <circle cx="31" cy="4" r="3" fill="white" opacity="0.65" />
        <circle cx="24" cy="5" r="2.5" fill="white" opacity="0.5" />
        <circle cx="40" cy="16" r="2" fill="#ccfbf1" opacity="0.6" />
        <circle cx="36" cy="12" r="1.5" fill="white" opacity="0.3" />
        {/* لمعان الفقاعات */}
        <circle cx="34" cy="8" r="1.5" fill="white" opacity="0.5" />
        <circle cx="28" cy="6.5" r="1.2" fill="white" opacity="0.4" />
        <circle cx="38" cy="5.5" r="1" fill="white" opacity="0.3" />
        {/* نجوم لمعان */}
        <path d="M42 24l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#fbbf24" opacity="0.8" />
        <path d="M4 10l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#2dd4bf" opacity="0.7" />
        <path d="M6 38l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L2.5 40.3l2-.3z" fill="#fbbf24" opacity="0.5" />
      </g>
    </g>
  ),

  // 👩‍🦰 بنت بشعر طويل ناعم مع خصلات
  hair: (
    <g>
      <defs>
        <linearGradient id="hr-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="hr-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="hr-highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" opacity="0.7" />
          <stop offset="100%" stopColor="#f97316" opacity="0" />
        </linearGradient>
        <linearGradient id="hr-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="hr-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="hr-blush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
        </linearGradient>
        <filter id="hr-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#9a3412" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#hr-shadow)">
        {/* شعر خلفي */}
        <path d="M8 20c-2 6-3 16 0 24c0.5 2 2 2 2.5 0c1-4 1-10 0-16" fill="url(#hr-hair)" />
        <path d="M40 20c2 6 3 16 0 24c-0.5 2-2 2-2.5 0c-1-4-1-10 0-16" fill="url(#hr-hair)" />
        {/* شعر علوي */}
        <path d="M8 20c0-10 7-17 16-17s16 7 16 17c0 0-3-7-8-9c-4-1.5-8-1.5-12 0c-5 2-10 7-12 9z" fill="url(#hr-hair)" />
        {/* خصلات شعر برتقالي */}
        <path d="M12 10c3-2 8-4 12-4s9 2 12 4c-2-3-7-6-12-6s-10 3-12 6z" fill="url(#hr-highlight)" />
        <path d="M14 12c2-1 6-3 10-3" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M10 28c-1 4-1 8 0 12" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d="M38 28c1 4 1 8 0 12" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.3" />
        {/* لمعة شعر */}
        <path d="M10 24c-1 3-1 8 0 12" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
        <path d="M38 24c1 3 1 8 0 12" stroke="white" strokeWidth="1" fill="none" opacity="0.15" />
        {/* وش */}
        <ellipse cx="24" cy="24" rx="12" ry="13" fill="url(#hr-face)" />
        {/* عيون كبيرة */}
        <ellipse cx="19" cy="22" rx="3" ry="2.5" fill="white" />
        <ellipse cx="29" cy="22" rx="3" ry="2.5" fill="white" />
        <ellipse cx="19.5" cy="22.5" rx="2" ry="2" fill="#1e293b" />
        <ellipse cx="29.5" cy="22.5" rx="2" ry="2" fill="#1e293b" />
        <circle cx="18.5" cy="21.5" r="0.8" fill="white" opacity="0.9" />
        <circle cx="28.5" cy="21.5" r="0.8" fill="white" opacity="0.9" />
        {/* رموش */}
        <path d="M16 19c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none" />
        <path d="M27 19c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none" />
        {/* حواجب */}
        <path d="M15.5 17.5c1.5-2 4.5-2 6 0" stroke="#0f172a" strokeWidth="1.2" fill="none" />
        <path d="M26.5 17.5c1.5-2 4.5-2 6 0" stroke="#0f172a" strokeWidth="1.2" fill="none" />
        {/* بلاش */}
        <circle cx="15" cy="26" r="3" fill="url(#hr-blush)" opacity="0.5" />
        <circle cx="33" cy="26" r="3" fill="url(#hr-blush)" opacity="0.5" />
        {/* شفايف */}
        <path d="M20 29c1.5 2.5 6 2.5 8 0" stroke="url(#hr-lip)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* أنف */}
        <path d="M23 25.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none" />
        {/* مقص شعر */}
        <g transform="translate(36, 36) rotate(15)">
          <path d="M0 0c-2-3-6-3-6 0s4 3 6 0z" fill="#f97316" opacity="0.8" />
          <path d="M0 0c2-3 6-3 6 0s-4 3-6 0z" fill="#fb923c" opacity="0.8" />
          <circle cx="0" cy="0" r="1.5" fill="#d97706" />
        </g>
        {/* نجوم */}
        <path d="M4 6l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#f97316" opacity="0.8" />
        <path d="M42 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L38.5 8.3l2-.3z" fill="#fbbf24" opacity="0.6" />
      </g>
    </g>
  ),

  // 👩 بنت ببشرة ناعمة مع قطرة كريم
  skin: (
    <g>
      <defs>
        <linearGradient id="sk-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="sk-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="sk-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sk-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="sk-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="sk-blush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sk-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <filter id="sk-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.5" floodColor="#155e75" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#sk-shadow)">
        {/* شعر */}
        <ellipse cx="24" cy="14" rx="14" ry="15" fill="url(#sk-hair)" />
        <path d="M10 14c0-8 6-14 14-14s14 6 14 14c0 0-2-4-6-5s-7 0-10 0-8 2-10 5z" fill="#b45309" />
        {/* خصلات شعر */}
        <path d="M10 18c-2 4-2 10 0 14" stroke="#78350f" strokeWidth="2" fill="none" />
        <path d="M38 18c2 4 2 10 0 14" stroke="#78350f" strokeWidth="2" fill="none" />
        {/* وش */}
        <ellipse cx="24" cy="24" rx="12" ry="13" fill="url(#sk-face)" />
        {/* توهج البشرة */}
        <ellipse cx="24" cy="24" rx="12" ry="13" fill="url(#sk-glow)" />
        {/* عيون كبيرة */}
        <ellipse cx="19" cy="22" rx="3" ry="2.5" fill="white" />
        <ellipse cx="29" cy="22" rx="3" ry="2.5" fill="white" />
        <ellipse cx="19.5" cy="22.5" rx="2" ry="2" fill="#1e293b" />
        <ellipse cx="29.5" cy="22.5" rx="2" ry="2" fill="#1e293b" />
        <circle cx="18.5" cy="21.5" r="0.8" fill="white" opacity="0.9" />
        <circle cx="28.5" cy="21.5" r="0.8" fill="white" opacity="0.9" />
        {/* رموش */}
        <path d="M16 19c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none" />
        <path d="M27 19c1-1.5 3-1.5 5 0" stroke="#1e293b" strokeWidth="1" fill="none" />
        {/* حواجب */}
        <path d="M15.5 17.5c1.5-2 4.5-2 6 0" stroke="#78350f" strokeWidth="1.2" fill="none" />
        <path d="M26.5 17.5c1.5-2 4.5-2 6 0" stroke="#78350f" strokeWidth="1.2" fill="none" />
        {/* بلاش */}
        <circle cx="15" cy="26" r="3" fill="url(#sk-blush)" opacity="0.5" />
        <circle cx="33" cy="26" r="3" fill="url(#sk-blush)" opacity="0.5" />
        {/* شفايف ابتسامة */}
        <path d="M20 29c1.5 2.5 6 2.5 8 0" stroke="url(#sk-lip)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* أنف */}
        <path d="M23 25.5c0.5 0.5 1.5 0.5 2 0" stroke="#d97706" strokeWidth="0.8" fill="none" />
        {/* قطرة كريم */}
        <path d="M8 36c0 0 5 6 5 10a5 5 0 01-10 0c0-4 5-10 5-10z" fill="url(#sk-drop)" />
        <path d="M8 36c0 0 2 4 2 6a2 2 0 01-4 0c0-2 2-6 2-6z" fill="white" opacity="0.4" />
        {/* ورقة صبار */}
        <path d="M40 38c-3-5-8-4-8-1s5 5 8 1z" fill="url(#sk-leaf)" opacity="0.7" />
        <path d="M40 38c-2-3-4-2.5-4-1s3 3 4 1z" fill="white" opacity="0.2" />
        {/* نجوم توهج */}
        <path d="M4 6l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z" fill="#22d3ee" opacity="0.9" />
        <path d="M42 6l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L38.5 8.3l2-.3z" fill="#22d3ee" opacity="0.7" />
        <path d="M42 42l1 2 2 .3-1.5 1.5.3 2-2-1-2 1 .3-2L38.5 44.3l2-.3z" fill="#06b6d4" opacity="0.5" />
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
