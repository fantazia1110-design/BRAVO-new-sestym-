'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuickActionCardProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  delay?: number;
}

export default function QuickActionCard({
  label,
  href,
  icon,
  gradient = 'from-violet-500 to-purple-700',
  glow = 'shadow-purple-500/30',
  delay = 0,
}: QuickActionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden animate-slide-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        background: hovered ? '#6d28d9' : '#ffffff',
        border: hovered ? '2px solid transparent' : '2px solid rgba(0,0,0,0.06)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 0 18px rgba(109,40,217,0.33), 0 14px 28px -6px rgba(109,40,217,0.44)'
          : '0 2px 8px -2px rgba(0,0,0,0.08)',
        textDecoration: 'none',
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* شعاع ضوء - اللمعة */}
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

      {/* أيقونة */}
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg ${glow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
        style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}
      >
        {icon}
      </div>

      {/* نص */}
      <span
        className="font-bold text-lg transition-colors duration-300"
        style={{
          color: hovered ? '#ffffff' : undefined,
          position: 'relative',
          zIndex: 2,
        }}
      >{label}</span>
    </Link>
  );
}
