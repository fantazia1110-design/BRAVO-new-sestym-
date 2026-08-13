'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, Sparkles, Droplets, TrendingUp, Package, Beaker, Factory, ShoppingCart, Settings, ChevronLeft, Truck, FileText, Users, CreditCard } from 'lucide-react';

const sections = [
  {
    id: 'detergents',
    name: 'المنظفات',
    description: 'منظفات فعالة بتركيبات آمنة ومبتكرة',
    image: '/icons/real-detergents.jpg',
    color: '#2563eb',
    colorLight: '#3b82f6',
    stats: [
      { label: 'منتج', value: '8', icon: <Package size={22} /> },
      { label: 'تركيبة', value: '5', icon: <Beaker size={22} /> },
      { label: 'مادة خام', value: '12', icon: <FlaskConical size={22} /> },
    ],
    details: 'منظفات للأسطح، الأطباق، الملابس، الأرضيات والحمامات. تركيبات فعالة بصيغ آمنة للبيئة.',
    trending: '+12%',
    orders: '156 طلب',
    route: '/detergents',
  },
  {
    id: 'cosmetics',
    name: 'مستحضرات التجميل',
    description: 'منتجات تجميلية عالية الجودة بتركيبات طبيعية',
    image: '/icons/real-cosmetics.jpg',
    color: '#db2777',
    colorLight: '#ec4899',
    stats: [
      { label: 'منتج', value: '8', icon: <Package size={22} /> },
      { label: 'تركيبة', value: '5', icon: <Beaker size={22} /> },
      { label: 'مادة خام', value: '12', icon: <FlaskConical size={22} /> },
    ],
    details: 'كريمات، سيرومات، ماسكات، أحمر شفاه ومستحضرات عناية بالبشرة. تركيبات طبيعية وآمنة.',
    trending: '+18%',
    orders: '203 طلب',
    route: '/cosmetics',
  },
  {
    id: 'perfumes',
    name: 'العطور',
    description: 'عطور فاخرة بتركيبات فرانكو-عربية فريدة',
    image: '/icons/real-perfumes.jpg',
    color: '#7c3aed',
    colorLight: '#8b5cf6',
    stats: [
      { label: 'منتج', value: '8', icon: <Package size={22} /> },
      { label: 'تركيبة', value: '5', icon: <Beaker size={22} /> },
      { label: 'مادة خام', value: '12', icon: <FlaskConical size={22} /> },
    ],
    details: 'عطور رجالية ونسائية، بخرات، معطرات جو. تركيبات فرانكو-عربية فريدة ومميزة.',
    trending: '+25%',
    orders: '89 طلب',
    route: '/perfumes',
  },
];

function SectionCard({ section, index }: { section: typeof sections[number]; index: number }) {
  const [hov, setHov] = useState(false);
  const router = useRouter();

  return (
    <div
      className="animate-slide-up"
      style={{
        animationDelay: `${0.2 + index * 0.15}s`,
        animationFillMode: 'both',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '2rem',
        overflow: 'hidden',
        background: '#ffffff',
        border: `2.5px solid ${hov ? section.color : '#e2e8f0'}`,
        boxShadow: hov
          ? `0 0 40px ${section.color}33, 0 30px 60px -10px rgba(0,0,0,0.25)`
          : '0 6px 24px -4px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(.34,1.56,.64,1)',
        transform: hov ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => router.push(section.route)}
    >
      {/* الصورة الحقيقية الكبيرة */}
      <div style={{
        height: '360px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img 
          src={section.image} 
          alt={section.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(.34,1.56,.64,1), filter 0.4s ease',
            transform: hov ? 'scale(1.08)' : 'scale(1)',
            filter: hov ? 'brightness(1.05)' : 'brightness(0.95)',
          }} 
        />
        {/* تدرج فوق الصورة */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '50%',
          background: `linear-gradient(to top, ${section.color}dd, ${section.color}88, transparent)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
          pointerEvents: 'none',
        }} />
        
        {/* شعاع ضوء */}
        {hov && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.25) 65%, transparent 80%)',
            animation: 'shineSweep 0.8s ease-out forwards',
            pointerEvents: 'none', zIndex: 3,
          }} />
        )}

        {/* اسم القسم على الصورة */}
        <div style={{
          position: 'absolute', bottom: '1.5rem', right: '1.5rem',
          zIndex: 4,
        }}>
          <h2 style={{
            fontWeight: 900, fontSize: '2.2rem', color: '#fff',
            margin: 0, lineHeight: 1.2,
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em',
          }}>
            {section.name}
          </h2>
          <p style={{
            fontWeight: 600, fontSize: '1rem', color: 'rgba(255,255,255,0.85)',
            margin: '0.3rem 0 0 0', textShadow: '0 1px 6px rgba(0,0,0,0.3)',
          }}>
            {section.description}
          </p>
        </div>

        {/* Badge الطلب */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px', padding: '0.5rem 1.2rem',
          color: '#fff', fontWeight: 800, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 4,
        }}>
          <ShoppingCart size={16} />
          {section.orders}
        </div>
        {/* Badge النمو */}
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px', padding: '0.5rem 1rem',
          color: '#4ade80', fontWeight: 900, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem', zIndex: 4,
        }}>
          <TrendingUp size={16} />
          {section.trending}
        </div>
      </div>

      {/* المحتوى */}
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* التفاصيل */}
        <p style={{ fontWeight: 600, fontSize: '1rem', color: '#475569', lineHeight: 1.8, margin: 0 }}>
          {section.details}
        </p>

        {/* الإحصائيات - كبيرة وواضحة */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {section.stats.map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '1.2rem 1rem', borderRadius: '1rem',
              background: `linear-gradient(145deg, ${section.color}08, ${section.color}04)`,
              border: `1.5px solid ${section.color}20`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
              transition: 'all 0.3s ease',
              transform: hov ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: hov ? `0 8px 20px -4px ${section.color}22` : 'none',
            }}>
              <div style={{
                width: '3rem', height: '3rem', borderRadius: '0.75rem',
                background: `linear-gradient(135deg, ${section.colorLight}, ${section.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', flexShrink: 0,
                boxShadow: `0 4px 14px -2px ${section.color}44`,
              }}>
                {stat.icon}
              </div>
              <div style={{ fontWeight: 900, fontSize: '2rem', color: section.color, lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* زر الدخول */}
        <div style={{
          marginTop: '0.5rem', padding: '1rem', borderRadius: '1rem',
          background: hov ? `linear-gradient(135deg, ${section.colorLight}, ${section.color})` : `${section.color}0a`,
          border: `2.5px solid ${hov ? section.color : `${section.color}25`}`,
          color: hov ? '#fff' : section.color,
          fontWeight: 800, fontSize: '1.15rem', textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: hov ? `0 8px 24px -4px ${section.color}55` : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          transform: hov ? 'scale(1.02)' : 'scale(1)',
        }}>
          دخول القسم
          <ChevronLeft size={22} />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #faf7ff 0%, #f4eeff 30%, #faf7ff 100%)',
      padding: '0',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {/* شريط علوي */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(109,40,217,0.1)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          padding: '0.5rem 1.2rem', borderRadius: '999px',
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: '#fff', fontWeight: 800, fontSize: '1rem',
          boxShadow: '0 4px 14px -2px rgba(109,40,217,0.3)',
          cursor: 'pointer',
        }} onClick={() => router.push('/dashboard')}>
          <FlaskConical size={20} />
          BRAVO
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            onClick={() => router.push('/settings')}
            style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(109,40,217,0.08)', border: '1.5px solid rgba(109,40,217,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#7c3aed',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#7c3aed';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'scale(1.1) rotate(30deg)';
              e.currentTarget.style.boxShadow = '0 4px 14px -2px rgba(109,40,217,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(109,40,217,0.08)';
              e.currentTarget.style.color = '#7c3aed';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Settings size={22} />
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 2rem 1rem 2rem',
        gap: '2.5rem',
      }}>
        {/* العنوان */}
        <div className="animate-slide-up" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '1rem',
            marginBottom: '1rem', padding: '0.7rem 1.8rem', borderRadius: '999px',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: '#fff', fontWeight: 800, fontSize: '1rem',
            boxShadow: '0 4px 14px -2px rgba(109,40,217,0.3)',
          }}>
            <FlaskConical size={20} />
            BRAVO Formula & Factory v2.2 • 17 تاب • 3 أقسام • أزرق/بينك/بنفسجي
          </div>
          <h1 style={{
            fontWeight: 900, fontSize: '3.2rem', lineHeight: 1.2,
            background: 'linear-gradient(135deg, #6d28d9, #7c3aed, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            margin: '0 0 0.75rem 0',
          }}>
            اختر قسمك
          </h1>
          <p style={{ fontWeight: 600, fontSize: '1.2rem', color: '#64748b', margin: 0 }}>
            اختر القسم اللي عايز تدخل منه وابدأ شغلك 🚀
          </p>
        </div>

        {/* الأقسام الثلاثة */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem',
          maxWidth: '1400px', width: '100%',
        }}>
          {sections.map((section, index) => (
            <SectionCard key={section.id} section={section} index={index} />
          ))}
        </div>
      </div>

      {/* أسفل */}
      <div style={{
        textAlign: 'center', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(109,40,217,0.08)',
      }}>
        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>
          © 2026 BRAVO — نظام إدارة التركيبات والتصنيع
        </p>
      </div>
    </div>
  );
}
