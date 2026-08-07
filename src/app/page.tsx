'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlaskConical, Sparkles, Droplets, TrendingUp, Package, Beaker, Factory, ShoppingCart } from 'lucide-react';

const sections = [
  {
    id: 'detergents',
    name: 'المنظفات',
    description: 'منظفات فعالة بتركيبات آمنة ومبتكرة',
    image: '/icons/3d-detergents.png',
    color: '#2563eb',
    colorLight: '#3b82f6',
    gradient: 'from-blue-500 to-blue-700',
    stats: [
      { label: 'منتج', value: '15', icon: <Package size={18} /> },
      { label: 'تركيبة', value: '8', icon: <Beaker size={18} /> },
      { label: 'مادة خام', value: '24', icon: <FlaskConical size={18} /> },
    ],
    details: 'منظفات للأسطحح، الأطباق، الملابس، الأرضيات والحمامات. تركيبات فعالة بصيغ آمنة للبيئة.',
    trending: '+12%',
    orders: '156 طلب',
  },
  {
    id: 'cosmetics',
    name: 'مستحضرات التجميل',
    description: 'منتججات تجميلية عالية الجودة بتركيبات طبيعية',
    image: '/icons/3d-cosmetics.png',
    color: '#db2777',
    colorLight: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    stats: [
      { label: 'منتج', value: '12', icon: <Package size={18} /> },
      { label: 'تركيبة', value: '6', icon: <Beaker size={18} /> },
      { label: 'مادة خام', value: '18', icon: <FlaskConical size={18} /> },
    ],
    details: 'كريمات، سيرومات، ماسكات، أحمر شفاه ومستحضرات عناية بالبشرة. تركيبات طبيعية وآمنة.',
    trending: '+18%',
    orders: '203 طلب',
  },
  {
    id: 'perfumes',
    name: 'العطور',
    description: 'عطور فاخرة بتركيبات فرانكو-عربية فريدة',
    image: '/icons/3d-perfumes.png',
    color: '#7c3aed',
    colorLight: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-600',
    stats: [
      { label: 'منتج', value: '8', icon: <Package size={18} /> },
      { label: 'تركيبة', value: '5', icon: <Beaker size={18} /> },
      { label: 'مادة خام', value: '12', icon: <FlaskConical size={18} /> },
    ],
    details: 'عطور رجالية ونسائية، بخرات، معطرات جو. تركيبات فرانكو-عربية فريدة ومميزة.',
    trending: '+25%',
    orders: '89 طلب',
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
        borderRadius: '1.5rem',
        overflow: 'hidden',
        background: '#ffffff',
        border: `2px solid ${hov ? section.color : '#e2e8f0'}`,
        boxShadow: hov
          ? `0 0 30px ${section.color}33, 0 25px 50px -10px rgba(0,0,0,0.2)`
          : '0 4px 20px -4px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(.34,1.56,.64,1)',
        transform: hov ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => router.push('/dashboard')}
    >
      {/* الصورة الكبيرة */}
      <div style={{
        height: '320px',
        background: `linear-gradient(145deg, ${section.colorLight}, ${section.color})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* شعاع ضوء */}
        {hov && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 35%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.2) 65%, transparent 80%)',
            animation: 'shineSweep 0.8s ease-out forwards',
            pointerEvents: 'none', zIndex: 3,
          }} />
        )}
        {/* حلقة توهج */}
        {hov && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '200%', height: '200%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${section.colorLight}33 0%, transparent 60%)`,
            animation: 'gentle-breathe 2s ease-in-out infinite',
            pointerEvents: 'none', zIndex: 1,
          }} />
        )}
        <div style={{
          width: '220px', height: '220px',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease',
          transform: hov ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
          filter: hov ? 'brightness(1.1) drop-shadow(0 8px 16px rgba(0,0,0,0.3))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
        }}>
          <img src={section.image} alt={section.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {/* Badge الطلب */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px', padding: '0.4rem 1rem',
          color: '#fff', fontWeight: 800, fontSize: '0.85rem',
          display: 'flex', alignItems: 'center', gap: '0.4rem', zIndex: 4,
        }}>
          <ShoppingCart size={14} />
          {section.orders}
        </div>
        {/* Badge النمو */}
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '999px', padding: '0.4rem 0.8rem',
          color: '#4ade80', fontWeight: 900, fontSize: '0.85rem',
          display: 'flex', alignItems: 'center', gap: '0.3rem', zIndex: 4,
        }}>
          <TrendingUp size={14} />
          {section.trending}
        </div>
      </div>

      {/* المحتوى */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* اسم القسم */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: '0.75rem',
            background: `linear-gradient(135deg, ${section.colorLight}, ${section.color})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0,
            boxShadow: `0 4px 12px -2px ${section.color}44`,
          }}>
            {section.id === 'detergents' && <Droplets size={20} />}
            {section.id === 'cosmetics' && <Sparkles size={20} />}
            {section.id === 'perfumes' && <FlaskConical size={20} />}
          </div>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: '1.4rem', color: section.color, margin: 0, lineHeight: 1.3 }}>{section.name}</h2>
            <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#64748b', margin: 0 }}>{section.description}</p>
          </div>
        </div>

        {/* التفاصيل */}
        <p style={{ fontWeight: 600, fontSize: '0.92rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
          {section.details}
        </p>

        {/* الإحصائيات */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {section.stats.map((stat, i) => (
            <div key={i} style={{
              flex: 1, padding: '0.75rem', borderRadius: '0.75rem',
              background: `${section.color}08`, border: `1px solid ${section.color}18`,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'all 0.3s ease',
              transform: hov ? 'translateY(-2px)' : 'translateY(0)',
            }}>
              <div style={{
                width: '2.2rem', height: '2.2rem', borderRadius: '0.5rem',
                background: `linear-gradient(135deg, ${section.colorLight}, ${section.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', flexShrink: 0, fontSize: '0.85rem',
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: section.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontWeight: 600, fontSize: '0.75rem', color: '#64748b' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* زر الدخول */}
        <div style={{
          marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem',
          background: hov ? `linear-gradient(135deg, ${section.colorLight}, ${section.color})` : `${section.color}0a`,
          border: `2px solid ${hov ? section.color : `${section.color}25`}`,
          color: hov ? '#fff' : section.color,
          fontWeight: 800, fontSize: '1rem', textAlign: 'center',
          transition: 'all 0.3s ease',
          boxShadow: hov ? `0 6px 20px -4px ${section.color}55` : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        }}>
          دخول القسم
          <span style={{ fontSize: '1.2rem' }}>←</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #faf7ff 0%, #f4eeff 30%, #faf7ff 100%)',
      padding: '2rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '2rem',
    }}>
      {/* العنوان */}
      <div className="animate-slide-up" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '1rem',
          marginBottom: '1rem', padding: '0.6rem 1.5rem', borderRadius: '999px',
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: '#fff', fontWeight: 800, fontSize: '0.9rem',
          boxShadow: '0 4px 14px -2px rgba(109,40,217,0.3)',
        }}>
          <FlaskConical size={18} />
          BRAVO Formula & Factory
        </div>
        <h1 style={{
          fontWeight: 900, fontSize: '2.8rem', lineHeight: 1.2,
          background: 'linear-gradient(135deg, #6d28d9, #7c3aed, #8b5cf6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '0 0 0.75rem 0',
        }}>
          اختر قسمك
        </h1>
        <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#64748b', margin: 0 }}>
          اختر القسم اللي عايز تدخل منه وابدأ شغلك 🚀
        </p>
      </div>

      {/* الأقسام الثلاثة */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem',
        maxWidth: '1200px', width: '100%',
      }}>
        {sections.map((section, index) => (
          <SectionCard key={section.id} section={section} index={index} />
        ))}
      </div>

      {/* أسفل */}
      <p style={{ fontWeight: 600, fontSize: '0.85rem', color: '#94a3b8', marginTop: '1rem' }}>
        © 2026 BRAVO — نظام إدارة التركيبات والتصنيع
      </p>
    </div>
  );
}
