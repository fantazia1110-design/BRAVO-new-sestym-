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
        borderRadius: '1rem',
        padding: '1.1rem 0.7rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease',
        cursor: 'default',
        zIndex: hovered ? 10 : 1,
        boxShadow: hovered
          ? `0 0 18px ${color}55, 0 0 35px ${color}28, 0 14px 28px -6px rgba(0,0,0,0.3)`
          : '0 4px 14px -4px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        border: hovered ? '1.5px solid rgba(255,255,255,0.25)' : '1.5px solid transparent',
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* شعاع ضوء */}
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

      {/* الأيقونة */}
      <div style={{
        margin: '0 auto 0.35rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        transition: 'transform 0.35s ease',
        transform: hovered ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '1.1rem', fontWeight: 900, color: '#ffffff',
        marginBottom: '0.2rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative', zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem', fontWeight: 900, color: '#ffffff',
        lineHeight: 1.15, marginBottom: '0.1rem',
        textShadow: '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '1rem', fontWeight: 800, color: '#ffffff',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
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
          transition: 'transform 0.3s ease',
          transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.3rem', padding: '0.3rem 0.7rem',
            borderRadius: '2rem', background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(74,222,128,0.3)',
            direction: 'rtl',
          }}>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
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
            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>{Math.abs(trend.value)}%</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>عن الشهر السابق</span>
          </div>
        </div>
      )}
    </div>
  );
}
