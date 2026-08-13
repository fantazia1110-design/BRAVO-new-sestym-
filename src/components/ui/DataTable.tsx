'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

function TableRow<T>({ item, columns, keyExtractor, onRowClick }: { item: T; columns: Column<T>[]; keyExtractor: (item: T) => string; onRowClick?: (item: T) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <tr
      key={keyExtractor(item)}
      onClick={() => onRowClick?.(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={onRowClick ? 'cursor-pointer' : ''}
      style={{
        background: hov ? 'linear-gradient(to left, rgba(124,58,237,0.06), transparent)' : 'transparent',
        transform: hov ? 'translateX(6px)' : 'translateX(0)',
        boxShadow: hov ? '-4px 0 0 0 #7c3aed' : 'none',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        borderBottom: '1px solid rgba(124,58,237,0.08)',
      } as React.CSSProperties}
    >
      {columns.map((col) => (
        <td key={col.key} className={col.className} style={{ transition: 'all 0.25s', fontWeight: hov ? 700 : 600 }}>
          {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
        </td>
      ))}
    </tr>
  );
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading,
  emptyMessage = 'لا توجد بيانات',
  pagination,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.className}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    <div className="skeleton h-4 w-full max-w-[200px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-state-icon mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="empty-state-title">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="table-container" style={{ borderRadius: '1rem', overflow: 'hidden', border: '1.5px solid rgba(124,58,237,0.1)' }}>
        <table className="table">
          <thead>
            <tr style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)' }}>
              {columns.map((col) => (
                <th key={col.key} className={col.className} style={{ fontWeight: 900, color: '#6d28d9', padding: '1rem 1.25rem', fontSize: '0.85rem' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableRow key={keyExtractor(item)} item={item} columns={columns} keyExtractor={keyExtractor} onRowClick={onRowClick} />
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-[var(--text-secondary)]">صفحة {pagination.currentPage} من {pagination.totalPages}</p>
          <div className="flex gap-2">
            <button className="btn btn-sm btn-outline" onClick={() => pagination.onPageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>
              <ChevronRight size={16} />
              السابق
            </button>
            <button className="btn btn-sm btn-outline" onClick={() => pagination.onPageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>
              التالي
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
