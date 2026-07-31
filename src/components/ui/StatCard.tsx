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
  effect: number;
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

    // ضوء يتبع الماوس
    const glow = card.querySelector('.cg') as HTMLElement;
    if (glow) {
      glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent 50%)`;
    }

    // ميلان 3D لكل التأثيرات
    if (effect === 1 || effect === 5 || effect === 6 || effect === 8) {
      const rx = ((y - centerY) / centerY) * -12;
      const ry = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(400px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-20px) scale(1.12)`;
    }
  };

  // أنماط مختلفة لكل تأثير
  const getHoverStyle = (): React.CSSProperties => {
    if (!hovered) return {};
    
    switch (effect) {
      case 1: // 3D Tilt + ظل عميق
        return {
          boxShadow: `0 40px 80px -20px ${color}dd, 0 0 60px -10px ${colorLight}aa, inset 0 0 40px ${colorLight}22`,
          background: `linear-gradient(145deg, ${colorLight}ee, ${color})`,
        };
      case 2: // نيون متوهج
        return {
          boxShadow: `0 0 15px ${colorLight}, 0 0 30px ${colorLight}88, 0 0 50px ${colorLight}55, 0 0 80px ${colorLight}33`,
          background: `linear-gradient(145deg, ${colorLight}, ${color})`,
          transform: 'translateY(-18px) scale(1.1)',
          border: `2px solid ${colorLight}88`,
        };
      case 3: // لمعان يمسح
        return {
          boxShadow: `0 25px 60px -12px ${color}cc, 0 0 30px ${colorLight}66`,
          transform: 'perspective(600px) rotateX(-3deg) rotateY(3deg) translateY(-15px) scale(1.08)',
        };
      case 4: // اهتزاز
        return {
          boxShadow: `0 0 30px ${color}cc, 0 0 60px ${colorLight}88`,
          transform: 'translateY(-15px) scale(1.1)',
          animation: 'shake 0.5s ease-in-out infinite',
        };
      case 5: // مطاطي
        return {
          boxShadow: `0 30px 70px -15px ${color}cc, 0 0 50px ${colorLight}77`,
          background: `linear-gradient(145deg, ${colorLight}ee, ${color})`,
        };
      case 6: // دوران محوري + انحناء
        return {
          boxShadow: `0 35px 75px -18px ${color}dd, 0 0 45px ${colorLight}88`,
          background: `linear-gradient(145deg, ${colorLight}dd, ${color})`,
        };
      case 7: // سبوتلايت
        return {
          boxShadow: `0 25px 60px -12px ${color}cc, 0 0 40px ${colorLight}77`,
          transform: 'translateY(-16px) scale(1.1)',
          background: `linear-gradient(145deg, ${colorLight}cc, ${color})`,
        };
      case 8: // انفجار ضوئي
        return {
          boxShadow: `0 0 40px ${colorLight}99, 0 0 80px ${color}66, 0 0 120px ${color}33`,
          background: `linear-gradient(145deg, ${colorLight}ee, ${color})`,
        };
      default:
        return {};
    }
  };

  const baseStyle: React.CSSProperties = {
    animationDelay: `${delay * 0.08}s`,
    animationFillMode: 'both',
    background: hovered ? getHoverStyle().background || `linear-gradient(145deg, ${colorLight}, ${color})` : `linear-gradient(145deg, ${colorLight}, ${color})`,
    borderRadius: hovered ? '1.15rem' : '1rem',
    padding: '1.1rem 0.7rem',
    textAlign: 'center',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, background 0.3s ease, border-radius 0.3s ease, border 0.3s ease',
    cursor: 'default',
    boxShadow: hovered ? getHoverStyle().boxShadow || `0 4px 14px -4px ${color}80` : `0 4px 14px -4px ${color}80`,
    transform: hovered ? (getHoverStyle().transform || 'translateY(-18px) scale(1.1)') : 'translateY(0) scale(1)',
    willChange: 'transform, box-shadow',
    zIndex: hovered ? 10 : 1,
    border: hovered ? (getHoverStyle().border || 'none') : 'none',
  };

  return (
    <div
      ref={cardRef}
      className="animate-slide-up"
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ضوء يتبع الماوس */}
      <div className="cg" style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* لمعة يمسح (تأثير 3) */}
      {effect === 3 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)' : 'none',
          transition: 'all 0.6s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* سبوتلايت (تأثير 7) */}
      {effect === 7 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? `radial-gradient(200px circle at 50% 50%, ${colorLight}66, transparent 60%)` : 'none',
          transition: 'all 0.4s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* انفجار ضوئي (تأثير 8) */}
      {effect === 8 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, ${colorLight}44 30%, transparent 60%)` : 'none',
          transition: 'all 0.3s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* لمعة ثابتة */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-30%', width: '60%', height: '60%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* خطوط متوهجة من الأطراف */}
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
        position: 'absolute', top: '4px', left: '4px',
        width: '1.2rem', height: '1.2rem', borderRadius: '50%',
        background: 'rgba(255,255,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.6rem', fontWeight: 900, color: '#fff', zIndex: 5,
        backdropFilter: 'blur(4px)',
      }}>{effect}</div>

      {/* الأيقونة */}
      <div style={{
        width: '2.2rem', height: '2.2rem', margin: '0 auto 0.3rem',
        borderRadius: '0.55rem', background: 'rgba(255,255,255,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.3) rotate(20deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hovered ? '0 0 25px rgba(255,255,255,0.4)' : 'none',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '1.1rem', fontWeight: 900, color: '#ffffff',
        marginBottom: '0.2rem',
        textShadow: hovered ? `0 0 15px ${colorLight}bb` : '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem', fontWeight: 900, color: '#ffffff',
        lineHeight: 1.15, marginBottom: '0.1rem',
        textShadow: hovered ? `0 0 20px ${colorLight}cc` : '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.18) translateY(-4px)' : 'scale(1) translateY(0)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '1rem', fontWeight: 800, color: '#ffffff',
          textShadow: hovered ? `0 0 10px ${colorLight}88` : '0 1px 2px rgba(0,0,0,0.15)',
          position: 'relative', zIndex: 2,
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-2px) scale(1.08)' : 'translateY(0) scale(1)',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.3rem', marginTop: '0.25rem', padding: '0.25rem 0.6rem',
          borderRadius: '2rem',
          background: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.22)',
          position: 'relative', zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          boxShadow: hovered ? '0 0 20px rgba(74,222,128,0.4)' : 'none',
        }}>
          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{trend.isPositive ? '↑' : '↓'}</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4ade80', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{Math.abs(trend.value)}%</span>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ffffffcc' }}>عن الشهر السابق</span>
        </div>
      )}

      {/* CSS للاهتزاز */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateY(-15px) scale(1.1) translateX(0); }
          25% { transform: translateY(-15px) scale(1.1) translateX(-4px); }
          75% { transform: translateY(-15px) scale(1.1) translateX(4px); }
        }
      `}</style>
    </div>
  );
}
