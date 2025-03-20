// components/blog/BlogList.tsx
'use client';

import React from 'react';
import BlogCard from './BlogCard';
import { PostPreview } from '@/types/sanity';
import { Button } from '@/components/ui/button';

interface BlogListProps {
  posts: PostPreview[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, page, totalPages, onPageChange }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-colors-custom-purple mb-4">
          No blog posts found
        </h3>
        <p className="text-gray-600">
          Check back soon for new content!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="text-colors-custom-purple border-colors-custom-purple"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "outline"}
                onClick={() => onPageChange(pageNum)}
                className={
                  pageNum === page
                    ? "bg-colors-custom-purple text-white"
                    : "text-colors-custom-purple border-colors-custom-purple"
                }
              >
                {pageNum}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="text-colors-custom-purple border-colors-custom-purple"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogList;