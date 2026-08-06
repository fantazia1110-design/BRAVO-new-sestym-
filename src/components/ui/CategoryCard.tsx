'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  count: number;
  colorClass: string;
  delay?: number;
}

export default function CategoryCard({
  id,
  name,
  count,
  colorClass,
  delay = 0,
}: CategoryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/products?category=${id}`}
      className={`animate-slide-up ${colorClass}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
        borderRadius: '1.2rem',
        padding: '1.5rem 1rem 1.2rem',
        textAlign: 'center',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease, border 0.3s ease',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '180px',
        boxShadow: hovered
          ? '0 0 25px rgba(255,255,255,0.2), 0 20px 40px -8px rgba(0,0,0,0.35), 0 0 60px -10px rgba(255,255,255,0.15)'
          : '0 4px 14px -4px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-12px) scale(1.04)' : 'translateY(0) scale(1)',
        border: hovered ? '2px solid rgba(255,255,255,0.4)' : '1.5px solid rgba(255,255,255,0.15)',
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* حلقة توهج نابضة */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '140%', height: '140%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
          animation: 'iconFloat 2s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      {/* شعاع ضوء */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.18) 62%, transparent 75%)',
          animation: 'shineSweep 0.75s ease-out forwards',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* خط علوي */}
      <div style={{
        position: 'absolute', top: 0, left: '12%', right: '12%',
        height: hovered ? '2px' : '0px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7), transparent)',
        transition: 'height 0.3s ease',
        boxShadow: hovered ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
        zIndex: 1,
      }} />

      {/* خط سفلي */}
      <div style={{
        position: 'absolute', bottom: 0, left: '12%', right: '12%',
        height: hovered ? '2px' : '0px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7), transparent)',
        transition: 'height 0.3s ease 0.05s',
        boxShadow: hovered ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
        zIndex: 1,
      }} />

      {/* خط يمين */}
      <div style={{
        position: 'absolute', top: '12%', bottom: '12%', right: 0,
        width: hovered ? '2px' : '0px',
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7), transparent)',
        transition: 'width 0.3s ease 0.1s',
        boxShadow: hovered ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
        zIndex: 1,
      }} />

      {/* خط يسار */}
      <div style={{
        position: 'absolute', top: '12%', bottom: '12%', left: 0,
        width: hovered ? '2px' : '0px',
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), rgba(255,255,255,0.7), transparent)',
        transition: 'width 0.3s ease 0.15s',
        boxShadow: hovered ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
        zIndex: 1,
      }} />

      {/* أيقونة 3D */}
      <div
        className="category-icon-animate"
        style={{
          width: '8.5rem',
          height: '8.5rem',
          margin: '0 auto 0.5rem',
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.4s cubic-bezier(.34,1.56,.64,1), filter 0.3s ease',
          transform: hovered ? 'scale(1.25) rotate(10deg)' : 'scale(1) rotate(0deg)',
          filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.35)) brightness(1.1)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
        }}
      >
        <img
          src={`/icons/3d-${id}.png`}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* اسم القسم */}
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: '0.5rem',
        textShadow: hovered ? '0 2px 8px rgba(0,0,0,0.3)' : '0 1px 3px rgba(0,0,0,0.2)',
        textAlign: 'center',
        lineHeight: 1.3,
        position: 'relative', zIndex: 2,
        transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1), text-shadow 0.3s ease, letter-spacing 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        letterSpacing: hovered ? '0.5px' : '0px',
      }}>{name}</h3>

      {/* عدد المنتجات */}
      <p style={{
        background: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)'}`,
        padding: hovered ? '0.35rem 1rem' : '0.3rem 0.85rem',
        borderRadius: '999px',
        fontWeight: 800,
        fontSize: hovered ? '0.95rem' : '0.9rem',
        margin: '0 auto',
        textAlign: 'center',
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0,0,0,0.25)',
        position: 'relative', zIndex: 2,
        transition: 'all 0.35s cubic-bezier(.34,1.56,.64,1)',
        transform: hovered ? 'translateY(-2px) scale(1.08)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
      }}>{count} منتج</p>
    </Link>
  );
}
