'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  glowColor?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  trend,
  glowColor,
  delay = 0,
}: StatCardProps) {
  return (
    <div 
      className="stat-card animate-slide-up"
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both',
      }}
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-bold text-[var(--text-secondary)] mb-2">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-sm font-semibold text-[var(--text-muted)] mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center gap-1.5 mt-3 text-sm font-bold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                trend.isPositive ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-[var(--text-muted)] font-semibold">عن الشهر السابق</span>
            </div>
          )}
        </div>
        <div className={`stat-icon ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
