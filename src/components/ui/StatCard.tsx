'use client';

import React, { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: `linear-gradient(145deg, ${colorLight}, ${color})`,
        borderRadius: '1.2rem',
        padding: '1.5rem 1rem 1.2rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease',
        cursor: 'default',
        zIndex: hovered ? 10 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '180px',
        boxShadow: hovered
          ? '0 0 18px rgba(255,255,255,0.12), 0 14px 28px -6px rgba(0,0,0,0.3)'
          : '0 4px 14px -4px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        border: hovered ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(255,255,255,0.15)',
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* شعاع ضوء - بالظبط زي CategoryCard */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.15) 62%, transparent 75%)',
          animation: 'shineSweep 0.75s ease-out forwards',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* خط علوي */}
      <div style={{
        position: 'absolute', top: 0, left: '12%', right: '12%',
        height: hovered ? '2px' : '0px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)',
        transition: 'height 0.3s ease',
        boxShadow: hovered ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
        zIndex: 1,
      }} />

      {/* خط سفلي */}
      <div style={{
        position: 'absolute', bottom: 0, left: '12%', right: '12%',
        height: hovered ? '2px' : '0px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)',
        transition: 'height 0.3s ease 0.05s',
        boxShadow: hovered ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
        zIndex: 1,
      }} />

      {/* خط يمين */}
      <div style={{
        position: 'absolute', top: '12%', bottom: '12%', right: 0,
        width: hovered ? '2px' : '0px',
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)',
        transition: 'width 0.3s ease 0.1s',
        boxShadow: hovered ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
        zIndex: 1,
      }} />

      {/* خط يسار */}
      <div style={{
        position: 'absolute', top: '12%', bottom: '12%', left: 0,
        width: hovered ? '2px' : '0px',
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), rgba(255,255,255,0.8), rgba(255,255,255,0.6), transparent)',
        transition: 'width 0.3s ease 0.15s',
        boxShadow: hovered ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
        zIndex: 1,
      }} />

      {/* الأيقونة - نفس تأثير CategoryCard */}
      <div
        className="category-icon-animate"
        style={{
          width: '2.6rem', height: '2.6rem', margin: '0 auto 0.5rem',
          borderRadius: '0.65rem',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.35s ease, filter 0.35s ease',
          transform: hovered ? 'scale(1.15) rotate(6deg)' : 'scale(1) rotate(0deg)',
          border: '1.5px solid rgba(255,255,255,0.15)',
          color: '#ffffff',
          filter: hovered ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
        }}
      >
        {icon}
      </div>

      {/* العنوان */}
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: '0.5rem',
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        textAlign: 'center',
        lineHeight: 1.3,
        position: 'relative', zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}>{title}</h3>

      {/* القيمة */}
      <p style={{
        background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.2)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.25)'}`,
        padding: '0.3rem 0.85rem',
        borderRadius: '999px',
        fontWeight: 800,
        fontSize: '1rem',
        margin: '0 auto',
        textAlign: 'center',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.85)',
          marginTop: '0.4rem',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          textAlign: 'center',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.3s ease',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative', zIndex: 2,
          marginTop: '0.3rem',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.3rem', padding: '0.3rem 0.7rem',
            borderRadius: '2rem',
            background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.25)',
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.35)' : 'rgba(74,222,128,0.3)'}`,
            direction: 'rtl',
            transition: 'all 0.3s ease',
          }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={trend.isPositive ? '#4ade80' : '#f87171'}
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))', flexShrink: 0 }}
            >
              {trend.isPositive ? (
                <>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </>
              ) : (
                <>
                  <line x1="7" y1="7" x2="17" y2="17" />
                  <polyline points="17 17 7 17 7 7" />
                </>
              )}
            </svg>
            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>{Math.abs(trend.value)}%</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>عن الشهر السابق</span>
          </div>
        </div>
      )}
    </div>
  );
}
