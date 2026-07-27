import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/ui/Sidebar';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'BRAVO FORMULA & FACTORY | نظام إدارة التركيبات والتصنيع',
  description: 'نظام متكامل لإدارة التركيبات والتصنيع والمواد الخام والمخزون والتكاليف والمبيعات والعملاء',
};

// سكربت يُنفَّذ قبل رسم الصفحة لمنع وميض الوضع الفاتح عند تحميل الوضع الداكن
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('bravo-theme');
    var mode = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : 'light';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.style.colorScheme = resolved;
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen app-shell">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
