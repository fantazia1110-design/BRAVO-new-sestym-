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
      glow.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,255,255,0.35), transparent 50%)`;
    }

    // ميلان 3D
    if (effect === 1 || effect === 5 || effect === 6 || effect === 8) {
      const rx = ((y - centerY) / centerY) * -12;
      const ry = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(400px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-20px) scale(1.12)`;
    }
  };

  // ألوان الإضاءة والخطوط لكل تأثير
  const getGlowColor = () => {
    switch (effect) {
      case 1: return '#818cf8'; // نيلي
      case 2: return '#c084fc'; // بنفسجي فاتح
      case 3: return '#67e8f9'; // سماوي
      case 4: return '#fca5a5'; // أحمر فاتح
      case 5: return '#86efac'; // أخضر فاتح
      case 6: return '#6ee7b7'; // أخضر نعناعي
      case 7: return '#fde68a'; // ذهبي فاتح
      case 8: return '#fda4af'; // وردي فاتح
      default: return colorLight;
    }
  };

  const glowColor = getGlowColor();

  return (
    <div
      ref={cardRef}
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: hovered ? `linear-gradient(145deg, ${colorLight}ee, ${color})` : `linear-gradient(145deg, ${colorLight}, ${color})`,
        borderRadius: hovered ? '1.15rem' : '1rem',
        padding: '1.1rem 0.7rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        boxShadow: hovered
          ? `0 30px 70px -15px ${color}cc, 0 0 50px ${glowColor}88, 0 0 100px ${glowColor}44, inset 0 0 30px ${glowColor}22`
          : `0 4px 14px -4px ${color}80`,
        transform: hovered ? 'translateY(-18px) scale(1.1)' : 'translateY(0) scale(1)',
        willChange: 'transform, box-shadow',
        zIndex: hovered ? 10 : 1,
        border: hovered ? `2px solid ${glowColor}88` : '2px solid transparent',
      } as React.CSSProperties}
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

      {/* توهج داخلي */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: hovered ? `radial-gradient(ellipse at 50% 50%, ${glowColor}33, transparent 70%)` : 'none',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
      }} />

      {/* لمعان يمسح (تأثير 3) */}
      {effect === 3 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? 'linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%)' : 'none',
          transition: 'all 0.6s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* انفجار ضوئي (تأثير 8) */}
      {effect === 8 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, ${glowColor}55 30%, transparent 60%)` : 'none',
          transition: 'all 0.3s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* سبوتلايت (تأثير 7) */}
      {effect === 7 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: hovered ? `radial-gradient(250px circle at 50% 30%, ${glowColor}66, transparent 60%)` : 'none',
          transition: 'all 0.4s ease',
          pointerEvents: 'none', zIndex: 1, borderRadius: '1rem',
          opacity: hovered ? 1 : 0,
        }} />
      )}

      {/* نيون خارجي (تأثير 2) */}
      {effect === 2 && (
        <div style={{
          position: 'absolute', inset: -4, borderRadius: '1.3rem',
          background: hovered ? `linear-gradient(145deg, ${glowColor}66, ${colorLight}44, ${glowColor}66)` : 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: -1,
          filter: 'blur(8px)',
        }} />
      )}

      {/* اهتزاز (تأثير 4) */}
      {effect === 4 && hovered && (
        <style>{`
          @keyframes card-shake-${effect} {
            0%, 100% { transform: translateY(-18px) scale(1.1) translateX(0); }
            25% { transform: translateY(-18px) scale(1.1) translateX(-5px); }
            75% { transform: translateY(-18px) scale(1.1) translateX(5px); }
          }
        `}</style>
      )}

      {/* ===== خطوط الإضاءة المتوهجة ===== */}

      {/* خط علوي متوهج */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: hovered ? '4px' : '0px',
        background: `linear-gradient(90deg, transparent, ${glowColor}, #fff, ${glowColor}, transparent)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 3,
        boxShadow: hovered ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}88` : 'none',
        borderRadius: '2px',
      }} />

      {/* خط سفلي متوهج */}
      <div style={{
        position: 'absolute', bottom: 0, left: '10%', right: '10%',
        height: hovered ? '4px' : '0px',
        background: `linear-gradient(90deg, transparent, ${glowColor}, #fff, ${glowColor}, transparent)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
        zIndex: 3,
        boxShadow: hovered ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}88` : 'none',
        borderRadius: '2px',
      }} />

      {/* خط يمين متوهج */}
      <div style={{
        position: 'absolute', top: '10%', bottom: '10%', right: 0,
        width: hovered ? '4px' : '0px',
        background: `linear-gradient(180deg, transparent, ${glowColor}, #fff, ${glowColor}, transparent)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
        zIndex: 3,
        boxShadow: hovered ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}88` : 'none',
        borderRadius: '2px',
      }} />

      {/* خط يسار متوهج */}
      <div style={{
        position: 'absolute', top: '10%', bottom: '10%', left: 0,
        width: hovered ? '4px' : '0px',
        background: `linear-gradient(180deg, transparent, ${glowColor}, #fff, ${glowColor}, transparent)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s',
        zIndex: 3,
        boxShadow: hovered ? `0 0 15px ${glowColor}, 0 0 30px ${glowColor}88` : 'none',
        borderRadius: '2px',
      }} />

      {/* زاوية يمين علوي متوهجة */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: hovered ? '20px' : '0px', height: hovered ? '20px' : '0px',
        background: `radial-gradient(circle at 100% 0%, ${glowColor}cc, transparent 70%)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
        zIndex: 3,
        boxShadow: hovered ? `0 0 20px ${glowColor}` : 'none',
      }} />

      {/* زاوية يسار سفلي متوهجة */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: hovered ? '20px' : '0px', height: hovered ? '20px' : '0px',
        background: `radial-gradient(circle at 0% 100%, ${glowColor}cc, transparent 70%)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
        zIndex: 3,
        boxShadow: hovered ? `0 0 20px ${glowColor}` : 'none',
      }} />

      {/* شارة رقم التأثير */}
      <div style={{
        position: 'absolute', top: '4px', left: '4px',
        width: '1.3rem', height: '1.3rem', borderRadius: '50%',
        background: hovered ? `${glowColor}66` : 'rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.6rem', fontWeight: 900, color: '#fff', zIndex: 5,
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 10px ${glowColor}` : 'none',
      }}>{effect}</div>

      {/* الأيقونة */}
      <div style={{
        width: '2.2rem', height: '2.2rem', margin: '0 auto 0.3rem',
        borderRadius: '0.55rem', background: 'rgba(255,255,255,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 2,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.3) rotate(20deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hovered ? `0 0 25px ${glowColor}88` : 'none',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '1.1rem', fontWeight: 900, color: '#ffffff',
        marginBottom: '0.2rem',
        textShadow: hovered ? `0 0 15px ${glowColor}bb` : '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.8rem', fontWeight: 900, color: '#ffffff',
        lineHeight: 1.15, marginBottom: '0.1rem',
        textShadow: hovered ? `0 0 20px ${glowColor}cc` : '0 2px 5px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.18) translateY(-4px)' : 'scale(1) translateY(0)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '1rem', fontWeight: 800, color: '#ffffff',
          textShadow: hovered ? `0 0 10px ${glowColor}88` : '0 1px 2px rgba(0,0,0,0.15)',
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
    </div>
  );
}
