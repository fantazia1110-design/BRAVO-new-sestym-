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
  // زجاجة منظف زرقاء 3D - مفصلة أكتر
  detergents: (
    <g>
      <defs>
        <linearGradient id="det-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="30%" stopColor="#60a5fa" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="det-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="det-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="det-label" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
        <filter id="det-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#1e3a8a" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#det-shadow)">
        {/* غطاء */}
        <rect x="17" y="3" width="14" height="8" rx="3" fill="url(#det-cap)" />
        <rect x="17" y="3" width="7" height="8" rx="3" fill="url(#det-shine)" opacity="0.3" />
        <rect x="19" y="11" width="10" height="3" rx="1" fill="#2563eb" />
        {/* عنق */}
        <rect x="20" y="14" width="8" height="5" rx="1.5" fill="url(#det-body)" />
        {/* الجسم */}
        <path d="M12 19h24v22a5 5 0 01-5 5H17a5 5 0 01-5-5V19z" fill="url(#det-body)" />
        {/* ملصق */}
        <rect x="17" y="24" width="14" height="12" rx="2.5" fill="url(#det-label)" />
        <rect x="19" y="27" width="10" height="2" rx="1" fill="#3b82f6" opacity="0.5" />
        <rect x="20" y="30.5" width="8" height="1.2" rx="0.6" fill="#3b82f6" opacity="0.35" />
        <rect x="21" y="33" width="6" height="1" rx="0.5" fill="#3b82f6" opacity="0.25" />
        {/* لمعة جسم */}
        <path d="M14 19h5v22a5 5 0 01-5-5V19z" fill="url(#det-shine)" />
        {/* فقاعات */}
        <circle cx="38" cy="10" r="3.5" fill="#bfdbfe" opacity="0.7" />
        <circle cx="38" cy="10" r="1.5" fill="white" opacity="0.4" />
        <circle cx="40" cy="17" r="2.5" fill="#dbeafe" opacity="0.5" />
        <circle cx="36" cy="6" r="2" fill="#eff6ff" opacity="0.6" />
        <circle cx="42" cy="14" r="1.5" fill="#eff6ff" opacity="0.4" />
      </g>
    </g>
  ),

  // أحمر شفاه ومراية 3D - مفصلة أكتر
  cosmetics: (
    <g>
      <defs>
        <linearGradient id="cos-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="cos-case" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="cos-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="cos-mirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="cos-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#881337" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#cos-shadow)">
        {/* قاعدة */}
        <rect x="12" y="26" width="16" height="18" rx="3.5" fill="url(#cos-case)" />
        <path d="M12 28h16v14a3.5 3.5 0 01-3.5 3.5h-9A3.5 3.5 0 0112 42V28z" fill="url(#cos-shine)" />
        {/* الجزء العلوي */}
        <rect x="14" y="17" width="12" height="10" rx="2.5" fill="#a21caf" />
        <path d="M14 17h5v10a2.5 2.5 0 01-2.5-2.5V17z" fill="url(#cos-shine)" opacity="0.3" />
        {/* أحمر الشفاه */}
        <path d="M16 17h8v-9a4 4 0 00-4-4 4 4 0 00-4 4v9z" fill="url(#cos-lip)" />
        <path d="M16 17h3v-9a3 3 0 00-1.5-2.5A3 3 0 0016 8v9z" fill="url(#cos-shine)" />
        {/* خط فاصل ذهبي */}
        <rect x="12" y="26" width="16" height="2.5" rx="1.25" fill="#fbbf24" />
        <rect x="12" y="26.5" width="16" height="1" rx="0.5" fill="#fde68a" opacity="0.6" />
        {/* مراية */}
        <circle cx="36" cy="30" r="8" fill="url(#cos-mirror)" />
        <circle cx="36" cy="30" r="6" fill="#fce7f3" />
        <circle cx="36" cy="30" r="5" fill="white" opacity="0.3" />
        <path d="M32 27a4 4 0 014 2.5" stroke="white" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M33 29a2 2 0 012 1" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
      </g>
    </g>
  ),

  // زجاجة عطر بنفسجية 3D - مفصلة أكتر
  perfumes: (
    <g>
      <defs>
        <linearGradient id="prf-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="30%" stopColor="#a78bfa" />
          <stop offset="60%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="prf-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prf-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="prf-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ddd6fe" opacity="0.5" />
          <stop offset="100%" stopColor="#c4b5fd" opacity="0.3" />
        </linearGradient>
        <filter id="prf-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#5b21b6" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#prf-shadow)">
        {/* غطاء ذهبي */}
        <rect x="17" y="2" width="14" height="6" rx="2.5" fill="url(#prf-cap)" />
        <rect x="17" y="2" width="7" height="6" rx="2.5" fill="url(#prf-shine)" opacity="0.4" />
        <rect x="19" y="8" width="10" height="3" rx="1" fill="#b45309" />
        {/* عنق */}
        <rect x="20" y="11" width="8" height="5" rx="1.5" fill="url(#prf-body)" />
        {/* الجسم */}
        <rect x="10" y="16" width="28" height="26" rx="9" fill="url(#prf-body)" />
        {/* السائل */}
        <path d="M12 30a8 8 0 018-8h8a8 8 0 018 8v5a9 9 0 01-9 9h-6a9 9 0 01-9-9v-5z" fill="url(#prf-liquid)" />
        {/* لمعة */}
        <path d="M12 16h6v26a9 9 0 01-6-9V16z" fill="url(#prf-shine)" />
        {/* رشاش */}
        <circle cx="38" cy="6" r="2" fill="#ddd6fe" opacity="0.8" />
        <circle cx="40" cy="12" r="1.5" fill="#ede9fe" opacity="0.6" />
        <circle cx="36" cy="3" r="1.2" fill="#f5f3ff" opacity="0.5" />
        <circle cx="42" cy="9" r="1" fill="#f5f3ff" opacity="0.4" />
      </g>
    </g>
  ),

  // صابونة خضراء 3D مع رغوة - مفصلة أكتر
  soap: (
    <g>
      <defs>
        <linearGradient id="sop-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="40%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="sop-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#99f6e4" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
        <linearGradient id="sop-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="sop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#065f46" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#sop-shadow)">
        {/* قاعدة الصابون */}
        <rect x="6" y="22" width="32" height="18" rx="7" fill="url(#sop-body)" />
        <path d="M6 24h32v14a7 7 0 01-7 7H13a7 7 0 01-7-7V24z" fill="url(#sop-shine)" opacity="0.3" />
        {/* الجزء العلوي */}
        <rect x="9" y="14" width="26" height="12" rx="6" fill="url(#sop-top)" />
        {/* لمعة */}
        <path d="M11 14h7v12a6 6 0 01-6-6V14z" fill="url(#sop-shine)" />
        {/* خطوط */}
        <path d="M16 24h18" stroke="white" strokeWidth="1" opacity="0.3" />
        <path d="M14 28h22" stroke="white" strokeWidth="0.8" opacity="0.2" />
        <path d="M16 32h18" stroke="white" strokeWidth="0.6" opacity="0.15" />
        {/* رغوة */}
        <circle cx="35" cy="8" r="5" fill="white" opacity="0.85" />
        <circle cx="29" cy="6" r="4" fill="white" opacity="0.7" />
        <circle cx="38" cy="4" r="3.5" fill="white" opacity="0.6" />
        <circle cx="32" cy="3" r="2.5" fill="white" opacity="0.5" />
        <circle cx="40" cy="14" r="2" fill="#ccfbf1" opacity="0.6" />
        <circle cx="26" cy="4" r="2" fill="white" opacity="0.4" />
        {/* لمعة على الرغوة */}
        <circle cx="33" cy="6" r="1.5" fill="white" opacity="0.3" />
      </g>
    </g>
  ),

  // شامبو برتقالي 3D - مفصلة أكتر
  hair: (
    <g>
      <defs>
        <linearGradient id="hair-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="30%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="hair-pump" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="hair-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="hair-label" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <filter id="hair-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#9a3412" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#hair-shadow)">
        {/* جسم الزجاجة */}
        <rect x="8" y="18" width="22" height="20" rx="6" fill="url(#hair-body)" />
        <path d="M8 20h22v16a6 6 0 01-6 6H14a6 6 0 01-6-6V20z" fill="url(#hair-shine)" opacity="0.3" />
        {/* عنق */}
        <rect x="13" y="12" width="12" height="7" rx="2.5" fill="url(#hair-body)" />
        {/* بامب */}
        <rect x="15" y="5" width="8" height="8" rx="2.5" fill="url(#hair-pump)" />
        <rect x="17" y="3" width="4" height="4" rx="1" fill="#9a3412" />
        <rect x="23" y="7" width="6" height="2" rx="1" fill="#9a3412" opacity="0.6" />
        {/* ملصق */}
        <rect x="12" y="22" width="14" height="10" rx="2.5" fill="url(#hair-label)" />
        <rect x="14" y="25" width="10" height="2" rx="1" fill="#f97316" opacity="0.5" />
        <rect x="15" y="28.5" width="8" height="1.2" rx="0.6" fill="#f97316" opacity="0.35" />
        {/* لمعة */}
        <path d="M10 18h5v20a6 6 0 01-5-6V18z" fill="url(#hair-shine)" />
        {/* خصلات شعر */}
        <path d="M34 10c2-3 5-2 6 1" stroke="#fdba74" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M35 17c2-2 5-1 6 2" stroke="#fdba74" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M34 24c2-3 5-2 6 1" stroke="#fdba74" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M36 14c1-2 3-1 4 1" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      </g>
    </g>
  ),

  // كريم بشرة سماوي 3D - مفصلة أكتر
  skin: (
    <g>
      <defs>
        <linearGradient id="skn-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="30%" stopColor="#22d3ee" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="skn-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        <linearGradient id="skn-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="skn-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#155e75" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#skn-shadow)">
        {/* جسم الكريم */}
        <rect x="8" y="24" width="28" height="18" rx="5" fill="url(#skn-body)" />
        <path d="M8 26h28v14a5 5 0 01-5 5H13a5 5 0 01-5-5V26z" fill="url(#skn-shine)" opacity="0.3" />
        {/* الغطاء */}
        <rect x="8" y="16" width="28" height="10" rx="4" fill="url(#skn-lid)" />
        <path d="M8 16h14v10a4 4 0 01-4-4v-6h-10z" fill="url(#skn-shine)" opacity="0.3" />
        {/* خط فاصل */}
        <rect x="8" y="24" width="28" height="2.5" rx="1.25" fill="#0891b2" />
        {/* الكريم اللي طالع */}
        <ellipse cx="22" cy="24" rx="8" ry="3.5" fill="white" opacity="0.9" />
        <ellipse cx="22" cy="23" rx="5.5" ry="2" fill="#f0fdfa" opacity="0.7" />
        <ellipse cx="20" cy="22.5" rx="2" ry="1" fill="white" opacity="0.5" />
        {/* لمعة */}
        <path d="M10 16h6v10a4 4 0 01-4-4v-6z" fill="url(#skn-shine)" />
        <path d="M10 26h5v12a5 5 0 01-5-5V26z" fill="url(#skn-shine)" />
        {/* قطرة */}
        <path d="M38 8c0 0 4 5 4 8a4 4 0 01-8 0c0-3 4-8 4-8z" fill="#06b6d4" opacity="0.6" />
        <path d="M38 8c0 0 1.5 4 1.5 5.5a1.5 1.5 0 01-3 0c0-1.5 1.5-5.5 1.5-5.5z" fill="white" opacity="0.4" />
        {/* نجمة */}
        <path d="M6 8l1.5 3 3.2.5-2.3 2.2.6 3.2-3-1.6-3 1.6.6-3.2L1.2 11.5l3.2-.5z" fill="#fbbf24" opacity="0.8" />
        {/* ورقة */}
        <path d="M4 36c2-4 6-3 6-1s-4 4-6 1z" fill="#34d399" opacity="0.5" />
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
