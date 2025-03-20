// components/blog/BlogCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostPreview } from '@/types/sanity';
import { getSanityImageUrl } from '@/lib/sanity';

interface BlogCardProps {
  post: PostPreview;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const imageUrl = post.mainImage ? getSanityImageUrl(post.mainImage) : '';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link href={`/blog/${post.slug.current}`}>
        {imageUrl ? (
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-colors-custom-pink flex items-center justify-center">
            <span className="text-colors-custom-purple text-2xl font-semibold">
              VerocasaAI
            </span>
          </div>
        )}
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-colors-custom-purple mb-2 line-clamp-2">
            {post.title}
          </h3>
          
          {post.excerpt && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
            <span>By {post.author || 'VerocasaAI'}</span>
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
          </div>
          
          <div className="mt-4">
            <span className="text-colors-custom-lightpurple font-medium text-sm">
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;