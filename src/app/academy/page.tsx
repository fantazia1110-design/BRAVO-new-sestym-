'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  GraduationCap,
  PlayCircle,
  BookOpen,
  Clock,
  CheckCircle,
  Star,
  ChevronLeft,
} from 'lucide-react';
import { t } from '@/lib/localization';
import Badge from '@/components/ui/Badge';

interface Lesson {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  isFree: boolean;
  thumbnail?: string;
  rating: number;
  studentsCount: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  lessonsCount: number;
  color: string;
}

// تصنيفات الدروس
const categories: Category[] = [
  { id: 'detergents', name: 'المنظفات', icon: '🧴', lessonsCount: 15, color: 'bg-blue-100 text-blue-600' },
  { id: 'cosmetics', name: 'مستحضرات التجميل', icon: '💄', lessonsCount: 12, color: 'bg-pink-100 text-pink-600' },
  { id: 'perfumes', name: 'العطور', icon: '🌸', lessonsCount: 8, color: 'bg-purple-100 text-purple-600' },
  { id: 'soap', name: 'الصابون', icon: '🧼', lessonsCount: 10, color: 'bg-green-100 text-green-600' },
  { id: 'hair_care', name: 'العناية بالشعر', icon: '💇', lessonsCount: 9, color: 'bg-amber-100 text-amber-600' },
  { id: 'skin_care', name: 'العناية بالبشرة', icon: '🧖', lessonsCount: 11, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'raw_materials', name: 'المواد الخام', icon: '⚗️', lessonsCount: 20, color: 'bg-gray-100 text-gray-600' },
];

// دروس تجريبية
const sampleLessons: Lesson[] = [
  {
    id: '1',
    title: 'صناعة الشامبو من الصفر',
    category: 'hair_care',
    categoryIcon: '💇',
    description: 'تعلم كيفية صناعة شامبو احترافي للعناية بالشعر مع شرح تفصيلي للمكونات والنسب',
    duration: '45 دقيقة',
    difficulty: 'beginner',
    isCompleted: true,
    isFree: true,
    rating: 4.8,
    studentsCount: 1250,
  },
  {
    id: '2',
    title: 'تركيبة سائل أطباق الليمون',
    category: 'detergents',
    categoryIcon: '🧴',
    description: 'شرح كامل لتركيبة سائل أطباق عالي الجودة مع رغوة كثيفة وقوة تنظيف ممتازة',
    duration: '30 دقيقة',
    difficulty: 'beginner',
    isCompleted: true,
    isFree: true,
    rating: 4.6,
    studentsCount: 980,
  },
  {
    id: '3',
    title: 'صناعة كريم مرطب للبشرة',
    category: 'skin_care',
    categoryIcon: '🧖',
    description: 'تركيبة كريم مرطب احترافي مع شرح طريقة عمل المستحلبات',
    duration: '60 دقيقة',
    difficulty: 'intermediate',
    isCompleted: false,
    isFree: false,
    rating: 4.9,
    studentsCount: 750,
  },
  {
    id: '4',
    title: 'أساسيات صناعة العطور',
    category: 'perfumes',
    categoryIcon: '🌸',
    description: 'مقدمة شاملة في عالم صناعة العطور والتعرف على العائلات العطرية',
    duration: '90 دقيقة',
    difficulty: 'intermediate',
    isCompleted: false,
    isFree: true,
    rating: 4.7,
    studentsCount: 620,
  },
  {
    id: '5',
    title: 'الصابون البارد (Cold Process)',
    category: 'soap',
    categoryIcon: '🧼',
    description: 'تعلم صناعة الصابون بالطريقة الباردة مع حسابات الصودا والزيوت',
    duration: '75 دقيقة',
    difficulty: 'advanced',
    isCompleted: false,
    isFree: false,
    rating: 4.9,
    studentsCount: 520,
  },
  {
    id: '6',
    title: 'منظف أرضيات متعدد الأغراض',
    category: 'detergents',
    categoryIcon: '🧴',
    description: 'تركيبة منظف أرضيات قوي وآمن على جميع الأسطح',
    duration: '25 دقيقة',
    difficulty: 'beginner',
    isCompleted: false,
    isFree: true,
    rating: 4.5,
    studentsCount: 890,
  },
];

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return <Badge variant="success">مبتدئ</Badge>;
    case 'intermediate':
      return <Badge variant="warning">متوسط</Badge>;
    case 'advanced':
      return <Badge variant="error">متقدم</Badge>;
    default:
      return null;
  }
};

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(sampleLessons);

  // إحصائيات
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => l.isCompleted).length;
  const freeLeasons = lessons.filter((l) => l.isFree).length;

  // فلترة الدروس
  const filteredLessons = lessons.filter((lesson) => {
    if (selectedCategory && lesson.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    return (
      lesson.title.includes(searchQuery) ||
      lesson.description.includes(searchQuery)
    );
  });

  return (
    <div data-section="academy">
      {/* الهيدر */}
      <div className="mb-8">
        <h1 className="page-title flex items-center gap-3">
          <GraduationCap size={28} className="text-[var(--primary)]" />
          {t('academy.title')}
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          تعلم صناعة المنظفات ومستحضرات التجميل والعطور والصابون خطوة بخطوة
        </p>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card card-body text-center">
          <p className="text-3xl font-bold text-[var(--primary)]">{totalLessons}</p>
          <p className="text-sm text-[var(--text-secondary)]">درس متاح</p>
        </div>
        <div className="card card-body text-center">
          <p className="text-3xl font-bold text-green-600">{completedLessons}</p>
          <p className="text-sm text-[var(--text-secondary)]">درس مكتمل</p>
        </div>
        <div className="card card-body text-center">
          <p className="text-3xl font-bold text-blue-600">{freeLeasons}</p>
          <p className="text-sm text-[var(--text-secondary)]">درس مجاني</p>
        </div>
        <div className="card card-body text-center">
          <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
          <p className="text-sm text-[var(--text-secondary)]">تصنيف</p>
        </div>
      </div>

      {/* التصنيفات */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">التصنيفات</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`card card-body text-center transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-[var(--primary)] bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === category.id ? null : category.id)
              }
            >
              <span className="text-3xl mb-2">{category.icon}</span>
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-[var(--text-muted)]">{category.lessonsCount} درس</p>
            </button>
          ))}
        </div>
      </div>

      {/* البحث */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
              <input
                type="text"
                placeholder="ابحث عن درس..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {selectedCategory && (
              <button
                className="btn btn-outline"
                onClick={() => setSelectedCategory(null)}
              >
                إظهار الكل
              </button>
            )}
          </div>
        </div>
      </div>

      {/* قائمة الدروس */}
      <div className="grid grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/academy/${lesson.id}`}
            className="card overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* صورة مصغرة */}
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
              <span className="text-6xl opacity-30">{lesson.categoryIcon}</span>
              <div className="absolute top-3 left-3 flex gap-2">
                {lesson.isFree ? (
                  <Badge variant="success">مجاني</Badge>
                ) : (
                  <Badge variant="primary">مدفوع</Badge>
                )}
              </div>
              {lesson.isCompleted && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="text-green-400" size={24} />
                </div>
              )}
              <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/30 transition-opacity">
                <PlayCircle className="text-white" size={48} />
              </button>
            </div>

            <div className="p-4">
              {/* العنوان والتصنيف */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg leading-tight">{lesson.title}</h3>
              </div>

              {/* الوصف */}
              <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                {lesson.description}
              </p>

              {/* معلومات إضافية */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Clock size={14} />
                    {lesson.duration}
                  </span>
                  {getDifficultyBadge(lesson.difficulty)}
                </div>
              </div>

              {/* التقييم */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="font-medium">{lesson.rating}</span>
                  <span className="text-[var(--text-muted)]">({lesson.studentsCount})</span>
                </div>
                <span className="flex items-center gap-1 text-[var(--primary)]">
                  عرض الدرس
                  <ChevronLeft size={16} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="empty-state py-12">
          <BookOpen className="empty-state-icon" />
          <p className="empty-state-title">لا توجد دروس</p>
          <p className="empty-state-description">
            جرب البحث بكلمات مختلفة أو اختر تصنيف آخر
          </p>
        </div>
      )}
    </div>
  );
}
