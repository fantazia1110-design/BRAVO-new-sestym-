'use client';

import React, { useRef, useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
  color: string;
  colorLight: string;
  effect: number; // 1-8 كل تأثير مختلف
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  delay = 0,
  color = '#7c3aed',
  colorLight = '#8b5cf6',
  effect = 1,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // تحريك الضوء لكل التأثيرات
    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '1';
      glow.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 50%)`;
    }

    const innerGlow = card.querySelector('.card-inner-glow') as HTMLElement;
    if (innerGlow) {
      innerGlow.style.opacity = '1';
      innerGlow.style.background = `radial-gradient(200px circle at ${x}px ${y}px, ${colorLight}44, transparent 60%)`;
    }

    // تأثير 1: ميلان 3D عميق
    if (effect === 1) {
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.12)`;
    }

    // تأثير 2: توهج نيون نابض
    if (effect === 2) {
      card.style.transform = `translateY(-18px) scale(1.1)`;
      const border = card.querySelector('.card-border-glow') as HTMLElement;
      if (border) {
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
        border.style.opacity = '1';
        border.style.background = `conic-gradient(from ${angle}deg at ${x}px ${y}px, ${colorLight}, transparent 25%, transparent 75%, ${colorLight})`;
      }
    }

    // تأثير 3: لمعان يمسح الكارت
    if (effect === 3) {
      card.style.transform = `perspective(600px) rotateX(${((y - centerY) / centerY) * -5}deg) rotateY(${((x - centerX) / centerX) * 5}deg) translateY(-15px) scale(1.08)`;
      const shine = card.querySelector('.card-shine') as HTMLElement;
      if (shine) {
        shine.style.opacity = '1';
        shine.style.background = `linear-gradient(${135 + (x / rect.width) * 90}deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)`;
        shine.style.backgroundSize = '200% 200%';
      }
    }

    // تأثير 4: اهتزاز تنبيه
    if (effect === 4) {
      const shake = Math.sin(Date.now() / 50) * 3;
      card.style.transform = `translateY(-15px) scale(1.1) translateX(${shake}px)`;
    }

    // تأثير 5: ارتفاع مطاطي
    if (effect === 5) {
      const pull = Math.abs(y - centerY) / centerY;
      const stretch = 1 + pull * 0.05;
      card.style.transform = `perspective(500px) rotateX(${((y - centerY) / centerY) * -8}deg) rotateY(${((x - centerX) / centerX) * 8}deg) translateY(-22px) scale(${stretch})`;
    }

    // تأثير 6: دوران محوري
    if (effect === 6) {
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      const skewX = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skewX(${skewX}deg) translateY(-18px) scale(1.1)`;
    }

    // تأثير 7: سبوتلايت
    if (effect === 7) {
      card.style.transform = `translateY(-16px) scale(1.08)`;
      const spotlight = card.querySelector('.card-spotlight') as HTMLElement;
      if (spotlight) {
        spotlight.style.opacity = '1';
        spotlight.style.background = `radial-gradient(180px circle at ${x}px ${y}px, ${colorLight}88, transparent 60%)`;
      }
    }

    // تأثير 8: انفجار ضوئي
    if (effect === 8) {
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(450px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.12)`;
      const burst = card.querySelector('.card-burst') as HTMLElement;
      if (burst) {
        burst.style.opacity = '1';
        burst.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.5) 0%, ${colorLight}44 30%, transparent 60%)`;
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: `linear-gradient(145deg, ${colorLight}, ${color})`,
        borderRadius: '1rem',
        padding: '1.1rem 0.7rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        boxShadow: `0 4px 14px -4px ${color}80`,
        transform: 'translateY(0) scale(1)',
        willChange: 'transform',
        zIndex: hovered ? 10 : 1,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovered(true);
        // تأثيرات مختلفة عند الدخول
        if (effect === 1) {
          e.currentTarget.style.boxShadow = `0 40px 80px -20px ${color}dd, 0 0 60px -10px ${colorLight}aa, inset 0 0 40px ${colorLight}22`;
        } else if (effect === 2) {
          e.currentTarget.style.boxShadow = `0 0 20px ${colorLight}88, 0 0 40px ${colorLight}55, 0 0 60px ${colorLight}33, 0 0 80px ${colorLight}22`;
          e.currentTarget.style.background = `linear-gradient(145deg, ${colorLight}, ${colorLight}cc)`;
        } else if (effect === 3) {
          e.currentTarget.style.boxShadow = `0 25px 60px -12px ${color}cc, 0 0 30px ${colorLight}66`;
        } else if (effect === 4) {
          e.currentTarget.style.boxShadow = `0 0 30px ${color}cc, 0 0 60px ${colorLight}88`;
          e.currentTarget.style.animation = 'none';
        } else if (effect === 5) {
          e.currentTarget.style.boxShadow = `0 30px 70px -15px ${color}cc, 0 0 50px ${colorLight}77`;
        } else if (effect === 6) {
          e.currentTarget.style.boxShadow = `0 35px 75px -18px ${color}dd, 0 0 45px ${colorLight}88`;
        } else if (effect === 7) {
          e.currentTarget.style.boxShadow = `0 25px 60px -12px ${color}cc`;
        } else if (effect === 8) {
          e.currentTarget.style.boxShadow = `0 0 40px ${colorLight}99, 0 0 80px ${color}66, 0 0 120px ${color}33`;
        }
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1) skewX(0)';
        card.style.boxShadow = `0 4px 14px -4px ${color}80`;
        card.style.background = `linear-gradient(145deg, ${colorLight}, ${color})`;
        card.style.zIndex = '1';

        const glow = card.querySelector('.card-glow') as HTMLElement;
        if (glow) glow.style.opacity = '0';
        const innerGlow = card.querySelector('.card-inner-glow') as HTMLElement;
        if (innerGlow) innerGlow.style.opacity = '0';
        const border = card.querySelector('.card-border-glow') as HTMLElement;
        if (border) border.style.opacity = '0';
        const shine = card.querySelector('.card-shine') as HTMLElement;
        if (shine) shine.style.opacity = '0';
        const spotlight = card.querySelector('.card-spotlight') as HTMLElement;
        if (spotlight) spotlight.style.opacity = '0';
        const burst = card.querySelector('.card-burst') as HTMLElement;
        if (burst) burst.style.opacity = '0';
      }}
    >
      {/* ضوء يتبع الماوس */}
      <div className="card-glow" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* توهج داخلي */}
      <div className="card-inner-glow" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* حدود نيون (تأثير 2) */}
      <div className="card-border-glow" style={{
        position: 'absolute', inset: -2, borderRadius: '1.15rem',
        opacity: 0, transition: 'opacity 0.3s ease', zIndex: -1, padding: '2px',
        background: `conic-gradient(from 0deg, ${colorLight}, transparent, ${colorLight}, transparent, ${colorLight})`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
      }} />

      {/* لمعان يمسح (تأثير 3) */}
      <div className="card-shine" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* سبوتلايت (تأثير 7) */}
      <div className="card-spotlight" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* انفجار ضوئي (تأثير 8) */}
      <div className="card-burst" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.2s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* لمعة ثابتة */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-30%', width: '60%', height: '60%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* خطوط متوهجة */}
      {['top', 'bottom', 'right', 'left'].map((pos, i) => {
        const isH = i < 2;
        return (
          <div key={i} style={{
            position: 'absolute',
            [pos]: 0,
            [isH ? 'left' : 'top']: 0,
            [isH ? 'right' : 'bottom']: 0,
            width: isH ? '100%' : hovered ? '3px' : '0px',
            height: isH ? hovered ? '3px' : '0px' : '100%',
            background: isH
              ? `linear-gradient(90deg, transparent, ${colorLight}, #fff, ${colorLight}, transparent)`
              : `linear-gradient(180deg, transparent, ${colorLight}, #fff, ${colorLight}, transparent)`,
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            zIndex: 3,
            boxShadow: hovered ? `0 0 20px ${colorLight}aa` : 'none',
          }} />
        );
      })}

      {/* شارة رقم التأثير */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '4px',
        width: '1.1rem',
        height: '1.1rem',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.55rem',
        fontWeight: 900,
        color: '#fff',
        zIndex: 5,
        backdropFilter: 'blur(4px)',
      }}>{effect}</div>

      {/* الأيقونة */}
      <div style={{
        width: '2.2rem',
        height: '2.2rem',
        margin: '0 auto 0.3rem',
        borderRadius: '0.55rem',
        background: 'rgba(255,255,255,0.22)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.25) rotate(15deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hovered ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '1.1rem',
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: '0.2rem',
        textShadow: hovered ? `0 0 12px ${colorLight}aa` : '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 2,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem',
        fontWeight: 900,
        color: '#ffffff',
        lineHeight: 1.15,
        marginBottom: '0.1rem',
        textShadow: hovered ? `0 0 18px ${colorLight}cc` : '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative',
        zIndex: 2,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.15) translateY(-3px)' : 'scale(1) translateY(0)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '1rem',
          fontWeight: 800,
          color: '#ffffff',
          textShadow: hovered ? `0 0 8px ${colorLight}88` : '0 1px 2px rgba(0,0,0,0.15)',
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          marginTop: '0.25rem',
          padding: '0.25rem 0.6rem',
          borderRadius: '2rem',
          background: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)',
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          boxShadow: hovered ? '0 0 15px rgba(74,222,128,0.3)' : 'none',
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{trend.isPositive ? '↑' : '↓'}</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{Math.abs(trend.value)}%</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffffcc' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
