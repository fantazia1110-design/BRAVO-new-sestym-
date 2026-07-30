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
        borderRadius: '0.75rem',
        padding: '0.65rem 0.6rem',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        boxShadow: '0 2px 8px -2px rgba(109, 40, 217, 0.4)',
        transform: 'translateY(0) scale(1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 16px 40px -8px rgba(109, 40, 217, 0.65)';
        e.currentTarget.style.background = 'linear-gradient(145deg, #8b5cf6, #7c3aed)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(109, 40, 217, 0.4)';
        e.currentTarget.style.background = 'linear-gradient(145deg, #7c3aed, #6d28d9)';
      }}
    >
      {/* الأيقونة */}
      <div style={{
        width: '1.8rem',
        height: '1.8rem',
        margin: '0 auto 0.25rem',
        borderRadius: '0.45rem',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '0.72rem',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: '0.1rem',
        letterSpacing: '0.01em',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.35rem',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.15,
        marginBottom: '0.05rem',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.65)',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.2rem',
          fontSize: '0.7rem',
          fontWeight: 800,
          marginTop: '0.1rem',
          color: '#a5f3c4',
        }}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
