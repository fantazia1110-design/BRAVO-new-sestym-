'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  Search,
  Star,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverEmoji: string;
  pages: number;
  isFree: boolean;
  price: number;
  downloads: number;
  rating: number;
}

const sampleBooks: Book[] = [
  {
    id: '1', title: 'أساسيات صناعة المنظفات', author: 'د. أحمد محمود',
    category: 'المنظفات', description: 'دليل شامل لصناعة المنظفات المنزلية والصناعية',
    coverEmoji: '🧴', pages: 180, isFree: true, price: 0, downloads: 1250, rating: 4.8,
  },
  {
    id: '2', title: 'كيمياء مستحضرات التجميل', author: 'د. سارة علي',
    category: 'مستحضرات التجميل', description: 'دليلك لفهم المكونات والتركيبات التجميلية',
    coverEmoji: '💄', pages: 220, isFree: false, price: 150, downloads: 890, rating: 4.9,
  },
  {
    id: '3', title: 'فن صناعة العطور', author: 'محمد الشرقي',
    category: 'العطور', description: 'من البداية للاحتراف في عالم العطور',
    coverEmoji: '🌸', pages: 280, isFree: false, price: 200, downloads: 720, rating: 4.7,
  },
  {
    id: '4', title: 'الصابون الطبيعي - دليل عملي', author: 'نورا حسن',
    category: 'الصابون', description: 'تعلم صناعة الصابون بالطريقة الباردة والساخنة',
    coverEmoji: '🧼', pages: 150, isFree: true, price: 0, downloads: 1580, rating: 4.6,
  },
  {
    id: '5', title: 'المواد الخام في الصناعات الكيميائية', author: 'د. خالد سعيد',
    category: 'المواد الخام', description: 'موسوعة شاملة للمواد الخام ووظائفها',
    coverEmoji: '⚗️', pages: 350, isFree: false, price: 250, downloads: 650, rating: 4.9,
  },
  {
    id: '6', title: 'العناية بالشعر - تركيبات احترافية', author: 'د. مريم عادل',
    category: 'العناية بالشعر', description: 'أسرار تركيبات الشامبو والبلسم الاحترافية',
    coverEmoji: '💇', pages: 200, isFree: true, price: 0, downloads: 1120, rating: 4.8,
  },
];

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'المنظفات', name: 'المنظفات', emoji: '🧴' },
  { id: 'مستحضرات التجميل', name: 'مستحضرات التجميل', emoji: '💄' },
  { id: 'العطور', name: 'العطور', emoji: '🌸' },
  { id: 'الصابون', name: 'الصابون', emoji: '🧼' },
  { id: 'المواد الخام', name: 'المواد الخام', emoji: '⚗️' },
  { id: 'العناية بالشعر', name: 'العناية بالشعر', emoji: '💇' },
];

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredBooks = books.filter((book) => {
    if (selectedCategory !== 'all' && book.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    return book.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div data-section="books">
      {/* الهيدر */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg">
            <BookOpen className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">الكتب الرقمية</h1>
            <p className="text-[var(--text-secondary)] font-semibold">
              مكتبة شاملة في صناعة المنظفات ومستحضرات التجميل
            </p>
          </div>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-3xl font-extrabold text-[var(--primary)]">{books.length}</p>
          <p className="text-sm font-bold text-[var(--text-secondary)]">كتاب متاح</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-extrabold text-green-600">{books.filter(b => b.isFree).length}</p>
          <p className="text-sm font-bold text-[var(--text-secondary)]">كتاب مجاني</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-extrabold text-purple-600">{books.reduce((sum, b) => sum + b.downloads, 0)}</p>
          <p className="text-sm font-bold text-[var(--text-secondary)]">عملية تحميل</p>
        </div>
        <div className="stat-card">
          <p className="text-3xl font-extrabold text-amber-600">{categories.length - 1}</p>
          <p className="text-sm font-bold text-[var(--text-secondary)]">تصنيف</p>
        </div>
      </div>

      {/* التصنيفات */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[var(--primary)] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:scale-105'
              }`}
            >
              {cat.emoji && <span className="ml-2">{cat.emoji}</span>}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={22} />
            <input
              type="text"
              placeholder="🔍 ابحث عن كتاب..."
              className="input pr-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* شبكة الكتب */}
      <div className="grid grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="card hover:shadow-xl transition-all overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center relative">
              <span className="text-8xl">{book.coverEmoji}</span>
              <div className="absolute top-3 right-3">
                {book.isFree ? (
                  <Badge variant="success">مجاني</Badge>
                ) : (
                  <Badge variant="primary">{book.price} ج.م</Badge>
                )}
              </div>
            </div>
            <div className="p-5">
              <Badge variant="info" size="sm">{book.category}</Badge>
              <h3 className="text-lg font-extrabold mt-2 mb-1">{book.title}</h3>
              <p className="text-sm text-[var(--text-muted)] font-semibold mb-2">
                {book.author}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                {book.description}
              </p>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="flex items-center gap-1 font-bold">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  {book.rating}
                </span>
                <span className="font-semibold text-[var(--text-muted)]">
                  {book.pages} صفحة
                </span>
                <span className="font-semibold text-[var(--text-muted)]">
                  {book.downloads} تحميل
                </span>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline flex-1">
                  <Eye size={16} />
                  معاينة
                </button>
                <button className="btn btn-primary flex-1">
                  <Download size={16} />
                  تحميل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
