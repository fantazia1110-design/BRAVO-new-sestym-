import React from 'react';

type CategoryIconProps = {
  id: string;
  className?: string;
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
  // زجاجة منظف زرقاء بغطاء كحلي وملصق أبيض وفقاعات
  detergents: (
    <g>
      <rect x="20" y="6" width="8" height="6" rx="1.5" fill="#1e3a8a" />
      <rect x="21" y="12" width="6" height="4" fill="#1e40af" />
      <rect x="15" y="16" width="18" height="26" rx="4" fill="#3b82f6" />
      <rect x="18" y="22" width="12" height="13" rx="2" fill="#ffffff" />
      <circle cx="36" cy="13" r="2.5" fill="#bfdbfe" />
      <circle cx="38" cy="19" r="1.6" fill="#dbeafe" />
    </g>
  ),
  // أحمر شفاه أحمر بقاعدة عنّابية
  cosmetics: (
    <g>
      <rect x="17" y="22" width="14" height="18" rx="3" fill="#7f1d1d" />
      <rect x="19" y="15" width="10" height="8" rx="2" fill="#b91c1c" />
      <path d="M21 15 L27 15 L26 7 Q24 4 22 7 Z" fill="#ef4444" />
      <rect x="22" y="8" width="1.6" height="6" rx="0.8" fill="#fca5a5" />
    </g>
  ),
  // قارورة عطر بنفسجية بسائل ورشّة
  perfumes: (
    <g>
      <rect x="21" y="5" width="6" height="6" rx="1.5" fill="#6d28d9" />
      <rect x="22" y="11" width="4" height="4" fill="#7c3aed" />
      <rect x="16" y="15" width="16" height="24" rx="6" fill="#8b5cf6" />
      <path d="M16 27 a8 9 0 0 0 16 0 Z" fill="#a78bfa" opacity="0.75" />
      <circle cx="34" cy="9" r="1.4" fill="#ddd6fe" />
      <circle cx="37" cy="12" r="1.1" fill="#ddd6fe" />
    </g>
  ),
  // قالب صابون تركوازي بطبقتين ورغوة بيضاء
  soap: (
    <g>
      <rect x="10" y="18" width="28" height="16" rx="5" fill="#0d9488" />
      <rect x="13" y="13" width="22" height="9" rx="4" fill="#2dd4bf" />
      <circle cx="34" cy="11" r="3" fill="#ffffff" />
      <circle cx="38" cy="15" r="2" fill="#ccfbf1" />
    </g>
  ),
  // مجفف شعر برتقالي بخطوط هواء
  hair: (
    <g>
      <rect x="10" y="18" width="20" height="12" rx="6" fill="#f97316" />
      <rect x="28" y="21" width="11" height="6" rx="3" fill="#ea580c" />
      <rect x="16" y="28" width="7" height="14" rx="3.5" fill="#f97316" />
      <path d="M40 19 h5" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M40 25 h5" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  // قطرة سماوية بلمعة ونجمة صفراء
  skin: (
    <g>
      <path
        d="M24 6 C24 6 36 20 36 30 a12 12 0 0 1 -24 0 C12 20 24 6 24 6 Z"
        fill="#06b6d4"
      />
      <path
        d="M19 27 a4 4 0 0 0 3 6"
        stroke="#a5f3fc"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M33 9 l1.4 2.8 3.1 .4 -2.2 2.1 .5 3 -2.7 -1.4 -2.7 1.4 .5 -3 -2.2 -2.1 3.1 -.4 Z"
        fill="#facc15"
      />
    </g>
  ),
};

export default function CategoryIcon({ id, className }: CategoryIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={36}
      height={36}
      className={className}
      role="img"
      aria-label={LABELS[id] ?? id}
      fill="none"
    >
      {ICONS[id] ?? null}
    </svg>
  );
}
