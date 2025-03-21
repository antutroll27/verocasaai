// components/blog/PopularPosts.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostPreview } from '@/types/sanity';
import { getSanityImageUrl } from '@/lib/sanity';

interface PopularPostsProps {
  posts: PostPreview[];
  className?: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const PopularPosts: React.FC<PopularPostsProps> = ({ posts, className = '' }) => {
  if (!posts || posts.length === 0) {
    return null;
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-xl font-bold text-colors-custom-purple">Popular Posts</h3>
      
      <div className="space-y-6">
        {posts.map(post => {
          const imageUrl = post.mainImage ? getSanityImageUrl(post.mainImage) : '';
          
          return (
            <Link href={`/blog/${post.slug.current}`} key={post._id} className="flex gap-4 group">
              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full w-full bg-colors-custom-pink flex items-center justify-center">
                    <span className="text-colors-custom-purple text-sm font-semibold">VC</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-colors-custom-purple group-hover:text-colors-custom-lightpurple transition-colors line-clamp-2">
                  {post.title}
                </h4>
                
                {post.publishedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularPosts;