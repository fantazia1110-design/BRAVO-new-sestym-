'use client';

import React from 'react';
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
  return (
    <Link
      href={`/products?category=${id}`}
      className={`category-card animate-slide-up ${colorClass}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both',
      }}
    >
      {/* أيقونة 3D */}
      <div className="category-icon-animate" style={{ width: '8.5rem', height: '8.5rem', margin: '0 auto 0.5rem', position: 'relative', zIndex: 2 }}>
        <img
          src={`/icons/3d-${id}.png`}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* اسم القسم */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem', textAlign: 'center', lineHeight: 1.3 }}>{name}</h3>

      {/* عدد المنتجات */}
      <p style={{ padding: '0.3rem 0.85rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.9rem', margin: '0 auto', textAlign: 'center' }}>{count} منتج</p>
    </Link>
  );
}
