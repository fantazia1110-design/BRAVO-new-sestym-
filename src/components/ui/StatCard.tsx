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
      className="stat-card-compact animate-slide-up"
      style={{
        animationDelay: `${delay * 0.08}s`,
        animationFillMode: 'both',
      }}
    >
      {/* الأيقونة */}
      <div className="stat-card-compact-icon">
        {icon}
      </div>

      {/* العنوان */}
      <p className="stat-card-compact-title">{title}</p>

      {/* القيمة */}
      <p className="stat-card-compact-value">{value}</p>

      {/* الوصف أو الاتجاه */}
      {subtitle && (
        <p className="stat-card-compact-subtitle">{subtitle}</p>
      )}
      {trend && (
        <div className={`stat-card-compact-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="stat-card-compact-trend-label">عن الشهر السابق</span>
        </div>
      )}
    </div>
  );
}
