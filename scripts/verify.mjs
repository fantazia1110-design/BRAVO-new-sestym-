// فحص سريع: هل نسخة الكود عندك محدّثة فعلاً؟
import { readFileSync } from 'node:fs';

const checks = [
  ['العملة مكتوبة "جنيه"',        'src/lib/utils.ts',      'جنيه'],
  ['ألوان البطاقات المميزة',       'src/app/globals.css',   'stat-card--violet'],
  ['الشريط العلوي لزر الوضع',      'src/app/globals.css',   '.topbar {'],
  ['أزرار القائمة الكبيرة',        'src/app/globals.css',   'min-height: 3.5rem'],
  ['خلفية الموف الغامق',           'src/app/globals.css',   '#120830'],
  ['تساوي ارتفاع البطاقات',        'src/app/globals.css',   '.list-card'],
  ['مكوّن الشريط العلوي',          'src/components/ui/TopBar.tsx', 'topbar-left'],
];

let ok = 0;
console.log('\n  فحص التعديلات في الكود:\n');
for (const [label, file, needle] of checks) {
  let found = false;
  try { found = readFileSync(file, 'utf8').includes(needle); } catch { found = false; }
  console.log(`  ${found ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'}  ${label}`);
  if (found) ok++;
}

console.log(`\n  النتيجة: ${ok}/${checks.length}`);
if (ok === checks.length) {
  console.log('\n  \x1b[32mالكود عندك محدّث بالكامل.\x1b[0m');
  console.log('  لو الشاشة لسه قديمة فالمشكلة في كاش المتصفح:');
  console.log('  اضغط Ctrl+Shift+R أو افتح الرابط في نافذة خفية (Incognito).\n');
} else {
  console.log('\n  \x1b[31mالكود عندك قديم.\x1b[0m شغّل: npm run update\n');
  process.exitCode = 1;
}
