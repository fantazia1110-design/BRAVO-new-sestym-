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
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.12)`;

    const glow = card.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.opacity = '1';
      glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 50%)`;
    }

    const border = card.querySelector('.card-border-glow') as HTMLElement;
    if (border) {
      const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
      border.style.opacity = '1';
      border.style.background = `conic-gradient(from ${angle}deg at ${x}px ${y}px, ${colorLight}, transparent 25%, transparent 75%, ${colorLight})`;
    }

    const innerGlow = card.querySelector('.card-inner-glow') as HTMLElement;
    if (innerGlow) {
      innerGlow.style.opacity = '1';
      innerGlow.style.background = `radial-gradient(250px circle at ${x}px ${y}px, ${colorLight}55, transparent 60%)`;
    }

    const ripple = card.querySelector('.card-ripple') as HTMLElement;
    if (ripple) {
      ripple.style.opacity = '1';
      ripple.style.background = `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.4), transparent 50%)`;
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
        transform: 'perspective(400px) rotateX(0) rotateY(0) translateY(0) scale(1)',
        willChange: 'transform',
        zIndex: hovered ? 10 : 1,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovered(true);
        e.currentTarget.style.boxShadow = `
          0 40px 80px -20px ${color}dd,
          0 0 60px -10px ${colorLight}aa,
          inset 0 0 40px ${colorLight}22
        `;
        e.currentTarget.style.background = `linear-gradient(145deg, ${colorLight}ee, ${color})`;
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        const card = e.currentTarget;
        card.style.transform = 'perspective(400px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        card.style.boxShadow = `0 4px 14px -4px ${color}80`;
        card.style.background = `linear-gradient(145deg, ${colorLight}, ${color})`;
        card.style.zIndex = '1';

        const glow = card.querySelector('.card-glow') as HTMLElement;
        if (glow) glow.style.opacity = '0';
        const border = card.querySelector('.card-border-glow') as HTMLElement;
        if (border) border.style.opacity = '0';
        const innerGlow = card.querySelector('.card-inner-glow') as HTMLElement;
        if (innerGlow) innerGlow.style.opacity = '0';
        const ripple = card.querySelector('.card-ripple') as HTMLElement;
        if (ripple) ripple.style.opacity = '0';
      }}
    >
      {/* حدود متوهجة تدور مع الماوس */}
      <div className="card-border-glow" style={{
        position: 'absolute',
        inset: -2,
        borderRadius: '1.15rem',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: -1,
        padding: '2px',
        background: `conic-gradient(from 0deg, ${colorLight}, transparent, ${colorLight}, transparent, ${colorLight})`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }} />

      {/* ضوء يتبع الماوس */}
      <div className="card-glow" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* توهج داخلي يتبع الماوس */}
      <div className="card-inner-glow" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* موجة ضوء تتبع الماوس */}
      <div className="card-ripple" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0, transition: 'opacity 0.2s ease', pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* لمعة ثابتة */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-30%', width: '60%', height: '60%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* خطوط متوهجة من الأطراف */}
      {[
        { pos: 'top', isH: true },
        { pos: 'bottom', isH: true },
        { pos: 'right', isH: false },
        { pos: 'left', isH: false },
      ].map((item, i) => (
        <div key={i} style={{
          position: 'absolute',
          [item.pos]: 0,
          [item.isH ? 'left' : 'top']: 0,
          [item.isH ? 'right' : 'bottom']: 0,
          width: item.isH ? '100%' : hovered ? '4px' : '0px',
          height: item.isH ? hovered ? '4px' : '0px' : '100%',
          background: item.isH
            ? `linear-gradient(90deg, transparent, ${colorLight}, #fff, ${colorLight}, transparent)`
            : `linear-gradient(180deg, transparent, ${colorLight}, #fff, ${colorLight}, transparent)`,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 3,
          boxShadow: hovered ? `0 0 25px ${colorLight}bb` : 'none',
        }} />
      ))}

      {/* انعكاس ضوء سفلي */}
      <div style={{
        position: 'absolute',
        bottom: hovered ? '-20%' : '-30%',
        left: '10%',
        right: '10%',
        height: '40%',
        background: `radial-gradient(ellipse, ${colorLight}33, transparent 70%)`,
        borderRadius: '50%',
        transition: 'all 0.4s ease',
        zIndex: 1,
        pointerEvents: 'none',
        filter: 'blur(10px)',
      }} />

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
        transform: hovered ? 'scale(1.3) rotate(20deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hovered ? '0 0 25px rgba(255,255,255,0.4)' : 'none',
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
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem',
        fontWeight: 900,
        color: '#ffffff',
        lineHeight: 1.15,
        marginBottom: '0.1rem',
        textShadow: hovered ? `0 0 20px ${colorLight}cc` : '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative',
        zIndex: 2,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.18) translateY(-4px)' : 'scale(1) translateY(0)',
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
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          boxShadow: hovered ? '0 0 20px rgba(74,222,128,0.4)' : 'none',
        }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: 900,
            color: '#4ade80',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}>{trend.isPositive ? '↑' : '↓'}</span>
          <span style={{
            fontSize: '0.95rem',
            fontWeight: 900,
            color: '#4ade80',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}>{Math.abs(trend.value)}%</span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#ffffffcc',
          }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
