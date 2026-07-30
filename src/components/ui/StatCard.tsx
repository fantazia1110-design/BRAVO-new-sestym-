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
  color?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  delay = 0,
  color = '#7c3aed',
}: StatCardProps) {
  return (
    <div
      className="animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
        background: `linear-gradient(145deg, ${color}08 0%, ${color}12 50%, ${color}06 100%)`,
        border: `1.5px solid ${color}30`,
        borderRadius: '1rem',
        padding: '1.1rem 1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 8px 24px -6px ${color}40`;
        e.currentTarget.style.borderColor = `${color}60`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = `${color}30`;
      }}
    >
      {/* شريط علوي */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color}, ${color}99, ${color})`,
        borderRadius: '3px 3px 0 0',
      }} />

      {/* الأيقونة */}
      <div style={{
        width: '2.4rem',
        height: '2.4rem',
        margin: '0 auto 0.5rem',
        borderRadius: '0.65rem',
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 3px 10px -2px ${color}66`,
      }}>
        {icon}
      </div>

      {/* العنوان */}
      <p style={{
        fontSize: '0.78rem',
        fontWeight: 700,
        color: color,
        marginBottom: '0.25rem',
      }}>{title}</p>

      {/* القيمة */}
      <p style={{
        fontSize: '1.3rem',
        fontWeight: 900,
        color: '#1e1b4b',
        lineHeight: 1.2,
        marginBottom: '0.15rem',
      }}>{value}</p>

      {/* الوصف */}
      {subtitle && (
        <p style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          color: '#7c6fa8',
        }}>{subtitle}</p>
      )}

      {/* الاتجاه */}
      {trend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.3rem',
          fontSize: '0.72rem',
          fontWeight: 700,
          marginTop: '0.2rem',
          color: trend.isPositive ? '#059669' : '#dc2626',
        }}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span style={{ fontWeight: 600, color: '#7c6fa8', fontSize: '0.65rem' }}>عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
