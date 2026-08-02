import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/ui/Sidebar';
import TopBar from '@/components/ui/TopBar';

export const metadata: Metadata = {
  title: 'BRAVO FORMULA & FACTORY | نظام إدارة التركيبات والتصنيع',
  description: 'نظام متكامل لإدارة التركيبات والتصنيع والمواد الخام والمخزون والتكاليف والمبيعات والعملاء',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="min-h-screen app-shell">
          <Sidebar />
          <TopBar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
