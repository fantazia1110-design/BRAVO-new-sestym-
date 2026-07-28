#!/usr/bin/env node
// مشغّل تطوير تفاعلي لـ BRAVO
// يشغّل خادم التطوير (next dev) ويسمح بإعادة التحميل الفوري من داخل الطرفية:
//   اضغط r لإعادة تشغيل الخادم (تُعاد تحميل الصفحة فوراً)، ctrl+c للخروج.
import { spawn } from 'node:child_process';

const extraArgs = process.argv.slice(2);
const child = spawn('npx', ['next', 'dev', ...extraArgs], {
  stdio: 'inherit',
  shell: false,
});

const shutdown = (sig) => {
  try {
    child.kill(sig);
  } catch {
    // تجاهل أخطاء الإنهاء إذا كان الخادم قد خرج
  }
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

child.on('exit', (code) => process.exit(typeof code === 'number' ? code : 0));
