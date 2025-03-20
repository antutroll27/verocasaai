// components/blog/CategoryList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/sanity';

interface CategoryListProps {
  categories: Category[];
  activeCategory?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, activeCategory }) => {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <Link 
        href="/blog"
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          !activeCategory 
            ? "bg-colors-custom-purple text-white" 
            : "bg-white text-colors-custom-purple border border-colors-custom-purple hover:bg-colors-custom-pink/10"
        }`}
      >
        All Posts
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/blog?category=${category.slug}`}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? "bg-colors-custom-purple text-white"
              : "bg-white text-colors-custom-purple border border-colors-custom-purple hover:bg-colors-custom-pink/10"
          }`}
          style={category.color ? { borderColor: activeCategory === category.slug ? 'transparent' : category.color } : {}}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;