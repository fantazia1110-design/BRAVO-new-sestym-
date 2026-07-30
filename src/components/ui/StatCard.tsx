'use client';

import React from 'react';

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
  return (
    <div
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
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        boxShadow: '0 4px 14px -4px rgba(109, 40, 217, 0.5)',
        transform: 'translateY(0) scale(1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.08)';
        e.currentTarget.style.boxShadow = '0 20px 50px -8px rgba(109, 40, 217, 0.7)';
        e.currentTarget.style.background = 'linear-gradient(145deg, #8b5cf6, #7c3aed)';
        e.currentTarget.style.borderRadius = '1.2rem';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 14px -4px rgba(109, 40, 217, 0.5)';
        e.currentTarget.style.background = 'linear-gradient(145deg, #7c3aed, #6d28d9)';
        e.currentTarget.style.borderRadius = '1rem';
      }}
    >
      {/* لمعة */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'all 0.35s ease',
      }} />

      {/* الأيقونة */}
      <div style={{
        width: '2.4rem',
        height: '2.4rem',
        margin: '0 auto 0.4rem',
        borderRadius: '0.65rem',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '0.85rem',
        fontWeight: 800,
        color: '#ffffff',
        marginBottom: '0.15rem',
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 900,
        color: '#ffffff',
        lineHeight: 1.2,
        marginBottom: '0.1rem',
        textShadow: '0 2px 4px rgba(0,0,0,0.25)',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#ffffffcc',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          fontSize: '0.78rem',
          fontWeight: 800,
          marginTop: '0.15rem',
          color: '#a5f3c4',
        }}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span style={{ fontWeight: 700, color: '#ffffffbb', fontSize: '0.68rem' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
