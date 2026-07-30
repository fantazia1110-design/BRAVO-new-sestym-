'use client';

import React, { useRef } from 'react';

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
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  delay = 0,
}: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    card.style.boxShadow = '0 4px 14px -4px rgba(109, 40, 217, 0.5)';
    card.style.background = 'linear-gradient(145deg, #7c3aed, #6d28d9)';
  };

  return (
    <div
      ref={cardRef}
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: 'linear-gradient(145deg, #7c3aed, #6d28d9)',
        borderRadius: '1rem',
        padding: '1.25rem 1rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, background 0.3s ease',
        cursor: 'default',
        boxShadow: '0 4px 14px -4px rgba(109, 40, 217, 0.5)',
        transform: 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)',
        willChange: 'transform',
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 25px 60px -12px rgba(109, 40, 217, 0.8), 0 0 30px -5px rgba(139, 92, 246, 0.4)';
        e.currentTarget.style.background = 'linear-gradient(145deg, #8b5cf6, #7c3aed)';
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* ضوء يتبع الماوس */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent 60%)',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1,
      }} />

      {/* حدود متوهجة */}
      <div style={{
        position: 'absolute',
        inset: -1,
        borderRadius: '1.1rem',
        background: 'linear-gradient(145deg, rgba(167,139,250,0.5), rgba(139,92,246,0.3), rgba(167,139,250,0.5))',
        zIndex: -1,
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* الأيقونة */}
      <div style={{
        width: '2.4rem',
        height: '2.4rem',
        margin: '0 auto 0.4rem',
        borderRadius: '0.65rem',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        zIndex: 2,
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '1rem',
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: '0.2rem',
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        position: 'relative',
        zIndex: 2,
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.7rem',
        fontWeight: 900,
        color: '#ffffff',
        lineHeight: 1.2,
        marginBottom: '0.15rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.25)',
        position: 'relative',
        zIndex: 2,
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.9rem',
          fontWeight: 800,
          color: '#ffffff',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          position: 'relative',
          zIndex: 2,
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          fontSize: '0.9rem',
          fontWeight: 800,
          marginTop: '0.15rem',
          color: '#ffffff',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          position: 'relative',
          zIndex: 2,
        }}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.8rem' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
