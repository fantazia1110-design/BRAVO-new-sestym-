'use client';

import React, { useState, useCallback } from 'react';

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
  effect?: number;
  effectName?: string;
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
  effectName = '',
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (effect !== 3) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, [effect]);

  const getHoverStyles = (): React.CSSProperties => {
    if (!hovered) {
      return {
        boxShadow: '0 4px 14px -4px rgba(0,0,0,0.2)',
        transform: 'translateY(0) scale(1)',
        border: '2px solid transparent',
      };
    }

    switch (effect) {
      case 1: // توهج ملون
        return {
          boxShadow: `0 0 20px ${color}88, 0 0 40px ${color}44, 0 12px 24px rgba(0,0,0,0.3)`,
          transform: 'translateY(-8px)',
          border: '2px solid transparent',
        };
      case 2: // شعاع ضوء
        return {
          boxShadow: '0 12px 28px -6px rgba(0,0,0,0.3)',
          transform: 'translateY(-8px)',
          border: '2px solid transparent',
        };
      case 3: // إمالة ثلاثية
        return {
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.35)',
          transform: `perspective(500px) rotateX(${-mousePos.y * 15}deg) rotateY(${mousePos.x * 15}deg) scale(1.03)`,
          border: '2px solid transparent',
        };
      case 4: // إطار متوهج
        return {
          boxShadow: `0 0 15px ${color}55, 0 0 30px ${color}22, 0 12px 24px rgba(0,0,0,0.25)`,
          transform: 'translateY(-8px)',
          border: '2px solid rgba(255,255,255,0.5)',
        };
      case 5: // تكبير
        return {
          boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
          transform: 'translateY(-4px) scale(1.08)',
          border: '2px solid transparent',
        };
      case 6: // رفع عميق
        return {
          boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          transform: 'translateY(-14px)',
          border: '2px solid rgba(255,255,255,0.3)',
        };
      case 7: // تحول لوني
        return {
          boxShadow: '0 12px 28px -6px rgba(0,0,0,0.3)',
          transform: 'translateY(-8px)',
          border: '2px solid transparent',
        };
      case 8: // دوران ثلاثي
        return {
          boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
          transform: 'perspective(600px) rotateY(-8deg) translateY(-8px)',
          border: '2px solid transparent',
        };
      default:
        return {
          boxShadow: '0 12px 28px -6px rgba(0,0,0,0.3)',
          transform: 'translateY(-8px)',
          border: '2px solid transparent',
        };
    }
  };

  const hoverStyles = getHoverStyles();

  const getBackground = () => {
    if (effect === 7 && hovered) {
      return `linear-gradient(145deg, ${color}, ${colorLight}, ${color})`;
    }
    return `linear-gradient(145deg, ${colorLight}, ${color})`;
  };

  const getInnerTransforms = () => {
    if (!hovered) {
      return { icon: 'rotate(0deg)', title: 'translateY(0)', value: 'translateY(0)', subtitle: 'translateY(0)', trend: 'translateY(0)' };
    }
    switch (effect) {
      case 1: return { icon: 'scale(1.15) rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      case 2: return { icon: 'rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      case 3: return { icon: 'scale(1.1)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      case 4: return { icon: 'rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      case 5: return { icon: 'scale(1.2) rotate(10deg)', title: 'translateY(-2px)', value: 'scale(1.05) translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'scale(1.05)' };
      case 6: return { icon: 'scale(1.15) rotate(8deg)', title: 'translateY(-3px)', value: 'translateY(-3px)', subtitle: 'translateY(-2px)', trend: 'translateY(-2px)' };
      case 7: return { icon: 'scale(1.1) rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      case 8: return { icon: 'rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
      default: return { icon: 'rotate(8deg)', title: 'translateY(-2px)', value: 'translateY(-2px)', subtitle: 'translateY(-1px)', trend: 'translateY(-1px)' };
    }
  };

  const inner = getInnerTransforms();

  return (
    <div
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: getBackground(),
        borderRadius: '1rem',
        padding: '1.1rem 0.7rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.5s ease',
        cursor: 'default',
        zIndex: hovered ? 10 : 1,
        ...hoverStyles,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      {/* شعاع ضوء - effect 2 */}
      {effect === 2 && hovered && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 58%, transparent 70%)',
          animation: 'shineSweep 0.7s ease-out forwards',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* إطار متوهج - effect 4 */}
      {effect === 4 && hovered && (
        <>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '10%', bottom: '10%', left: 0, width: '2px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.7), transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', top: '10%', bottom: '10%', right: 0, width: '2px', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.7), transparent)', zIndex: 1 }} />
        </>
      )}

      {/* الأيقونة */}
      <div style={{
        width: '2.2rem', height: '2.2rem', margin: '0 auto 0.3rem',
        borderRadius: '0.55rem', background: 'rgba(255,255,255,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: inner.icon,
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
        transform: inner.title,
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem', fontWeight: 900, color: '#ffffff',
        lineHeight: 1.15, marginBottom: '0.1rem',
        textShadow: '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: inner.value,
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '1rem', fontWeight: 800, color: '#ffffff',
          textShadow: '0 1px 2px rgba(0,0,0,0.15)',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.3s ease',
          transform: inner.subtitle,
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.3rem', marginTop: '0.25rem', padding: '0.25rem 0.6rem',
          borderRadius: '2rem', background: 'rgba(255,255,255,0.22)',
          position: 'relative', zIndex: 2,
          transition: 'transform 0.3s ease',
          transform: inner.trend,
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{trend.isPositive ? '↑' : '↓'}</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{Math.abs(trend.value)}%</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffffcc' }}>عن الشهر السابق</span>
        </div>
      )}

      {/* اسم التأثير */}
      {effectName && (
        <div style={{
          position: 'absolute',
          bottom: '3px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.55rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.45)',
          zIndex: 3,
          whiteSpace: 'nowrap',
          direction: 'rtl',
        }}>
          {effectName}
        </div>
      )}
    </div>
  );
}
