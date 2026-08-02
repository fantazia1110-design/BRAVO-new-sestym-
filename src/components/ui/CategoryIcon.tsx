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
  // زجاجة منظف زرقاء 3D
  detergents: (
    <g>
      <defs>
        <linearGradient id="det-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="det-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="det-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="det-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1e3a8a" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#det-shadow)">
        {/* غطاء */}
        <rect x="18" y="4" width="12" height="7" rx="2" fill="url(#det-cap)" />
        <rect x="20" y="11" width="8" height="3" rx="1" fill="#2563eb" />
        {/* عنق */}
        <rect x="20" y="14" width="8" height="4" rx="1" fill="url(#det-body)" />
        {/* الجسم */}
        <path d="M14 18h20v22a4 4 0 01-4 4H18a4 4 0 01-4-4V18z" fill="url(#det-body)" />
        {/* ملصق */}
        <rect x="18" y="24" width="12" height="10" rx="2" fill="white" opacity="0.9" />
        <rect x="20" y="27" width="8" height="1.5" rx="0.75" fill="#3b82f6" opacity="0.6" />
        <rect x="21" y="30" width="6" height="1" rx="0.5" fill="#3b82f6" opacity="0.4" />
        {/* لمعة */}
        <path d="M16 18h4v20a3 3 0 01-3-3V18z" fill="url(#det-shine)" />
        {/* فقاعات */}
        <circle cx="36" cy="12" r="2.5" fill="#bfdbfe" opacity="0.8" />
        <circle cx="38" cy="18" r="1.8" fill="#dbeafe" opacity="0.6" />
        <circle cx="34" cy="8" r="1.2" fill="#eff6ff" opacity="0.7" />
      </g>
    </g>
  ),

  // أحمر شفاه ومراية 3D
  cosmetics: (
    <g>
      <defs>
        <linearGradient id="cos-lip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="cos-case" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="cos-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="cos-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#881337" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#cos-shadow)">
        {/* قاعدة */}
        <rect x="14" y="26" width="14" height="16" rx="3" fill="url(#cos-case)" />
        <path d="M14 28h14v12a3 3 0 01-3 3H17a3 3 0 01-3-3V28z" fill="url(#cos-shine)" />
        {/* الجزء العلوي */}
        <rect x="16" y="18" width="10" height="9" rx="2" fill="#a21caf" />
        {/* أحمر الشفاه */}
        <path d="M18 18h6v-8a3 3 0 00-3-3 3 3 0 00-3 3v8z" fill="url(#cos-lip)" />
        <path d="M18 18h2v-8a2 2 0 00-1-2 2 2 0 00-1 2v8z" fill="url(#cos-shine)" />
        {/* خط فاصل */}
        <rect x="14" y="26" width="14" height="2" rx="1" fill="#fbbf24" opacity="0.7" />
        {/* مراية صغيرة */}
        <circle cx="35" cy="30" r="6" fill="#fda4af" stroke="#ec4899" strokeWidth="1.5" />
        <circle cx="35" cy="30" r="4" fill="#fce7f3" />
        <path d="M32 28a3 3 0 013 2" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
      </g>
    </g>
  ),

  // زجاجة عطر بنفسجية 3D
  perfumes: (
    <g>
      <defs>
        <linearGradient id="prf-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="prf-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="prf-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="prf-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#5b21b6" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#prf-shadow)">
        {/* غطاء ذهبي */}
        <rect x="19" y="4" width="10" height="5" rx="2" fill="url(#prf-cap)" />
        <rect x="21" y="9" width="6" height="3" rx="1" fill="#b45309" />
        {/* عنق */}
        <rect x="21" y="12" width="6" height="4" rx="1" fill="url(#prf-body)" />
        {/* الجسم */}
        <rect x="13" y="16" width="22" height="22" rx="7" fill="url(#prf-body)" />
        {/* السائل */}
        <path d="M15 28a5 5 0 015-5h8a5 5 0 015 5v6a7 7 0 01-7 7h-4a7 7 0 01-7-7v-6z" fill="#c4b5fd" opacity="0.4" />
        {/* لمعة */}
        <path d="M15 16h5v22a7 7 0 01-5-7V16z" fill="url(#prf-shine)" />
        {/* رشاش */}
        <circle cx="36" cy="8" r="1.5" fill="#ddd6fe" opacity="0.8" />
        <circle cx="38" cy="12" r="1.2" fill="#ede9fe" opacity="0.6" />
        <circle cx="34" cy="5" r="1" fill="#f5f3ff" opacity="0.5" />
      </g>
    </g>
  ),

  // صابونة خضراء 3D مع رغوة
  soap: (
    <g>
      <defs>
        <linearGradient id="sop-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="sop-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id="sop-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="sop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#065f46" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#sop-shadow)">
        {/* قاعدة الصابون */}
        <rect x="8" y="20" width="28" height="16" rx="6" fill="url(#sop-body)" />
        {/* الجزء العلوي */}
        <rect x="11" y="14" width="22" height="10" rx="5" fill="url(#sop-top)" />
        {/* لمعة */}
        <path d="M13 14h6v10a5 5 0 01-5-5v-5z" fill="url(#sop-shine)" />
        {/* خطوط */}
        <path d="M18 22h12" stroke="white" strokeWidth="0.8" opacity="0.3" />
        <path d="M16 26h16" stroke="white" strokeWidth="0.6" opacity="0.2" />
        {/* رغوة */}
        <circle cx="34" cy="10" r="4" fill="white" opacity="0.85" />
        <circle cx="30" cy="8" r="3" fill="white" opacity="0.7" />
        <circle cx="36" cy="7" r="2.5" fill="white" opacity="0.6" />
        <circle cx="32" cy="6" r="1.8" fill="white" opacity="0.5" />
        <circle cx="38" cy="14" r="1.5" fill="#ccfbf1" opacity="0.6" />
      </g>
    </g>
  ),

  // شامبو/سيشوار برتقالي 3D
  hair: (
    <g>
      <defs>
        <linearGradient id="hair-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="hair-pump" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="hair-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="hair-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#9a3412" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#hair-shadow)">
        {/* جسم الزجاجة */}
        <rect x="10" y="18" width="18" height="16" rx="5" fill="url(#hair-body)" />
        {/* عنق */}
        <rect x="14" y="12" width="10" height="7" rx="2" fill="url(#hair-body)" />
        {/* بامب */}
        <rect x="16" y="6" width="6" height="7" rx="2" fill="url(#hair-pump)" />
        <rect x="18" y="4" width="2" height="4" rx="1" fill="#9a3412" />
        {/* ملصق */}
        <rect x="13" y="22" width="12" height="8" rx="2" fill="white" opacity="0.85" />
        <rect x="15" y="25" width="8" height="1.5" rx="0.75" fill="#f97316" opacity="0.5" />
        <rect x="16" y="28" width="6" height="1" rx="0.5" fill="#f97316" opacity="0.3" />
        {/* لمعة */}
        <path d="M12 18h4v16a5 5 0 01-4-5V18z" fill="url(#hair-shine)" />
        {/* خطوط شعر */}
        <path d="M32 12c2-2 4-1 5 1" stroke="#fdba74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M33 18c2-1 4 0 5 2" stroke="#fdba74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M32 24c2-2 4-1 5 1" stroke="#fdba74" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
    </g>
  ),

  // كريم بشرة سماوي 3D
  skin: (
    <g>
      <defs>
        <linearGradient id="skn-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="skn-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="skn-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id="skn-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#155e75" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#skn-shadow)">
        {/* جسم الكريم */}
        <rect x="11" y="22" width="22" height="18" rx="4" fill="url(#skn-body)" />
        {/* الغطاء */}
        <rect x="11" y="16" width="22" height="8" rx="3" fill="url(#skn-lid)" />
        {/* خط فاصل */}
        <rect x="11" y="22" width="22" height="2" rx="1" fill="#0891b2" />
        {/* الكريم اللي طالع */}
        <ellipse cx="22" cy="22" rx="6" ry="2.5" fill="white" opacity="0.9" />
        <ellipse cx="22" cy="21" rx="4" ry="1.5" fill="#f0fdfa" opacity="0.7" />
        {/* لمعة */}
        <path d="M13 16h5v8a3 3 0 01-3-3v-5z" fill="url(#skn-shine)" />
        <path d="M13 24h4v12a4 4 0 01-4-4V24z" fill="url(#skn-shine)" />
        {/* قطرة */}
        <path d="M36 10c0 0 3 4 3 6a3 3 0 01-6 0c0-2 3-6 3-6z" fill="#06b6d4" opacity="0.6" />
        <path d="M36 10c0 0 1 3 1 4a1 1 0 01-2 0c0-1 1-4 1-4z" fill="white" opacity="0.4" />
        {/* نجمة */}
        <path d="M8 12l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" fill="#fbbf24" opacity="0.7" />
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
