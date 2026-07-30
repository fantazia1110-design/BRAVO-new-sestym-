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
        borderRadius: '0.85rem',
        padding: '0.85rem 0.75rem',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        cursor: 'default',
        boxShadow: '0 4px 14px -4px rgba(109, 40, 217, 0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(109, 40, 217, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 14px -4px rgba(109, 40, 217, 0.5)';
      }}
    >
      {/* الأيقونة */}
      <div style={{
        width: '2rem',
        height: '2rem',
        margin: '0 auto 0.35rem',
        borderRadius: '0.5rem',
        background: 'rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '0.82rem',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.85)',
        marginBottom: '0.15rem',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.5rem',
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1.2,
        marginBottom: '0.1rem',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
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
          <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.65)', fontSize: '0.68rem' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
