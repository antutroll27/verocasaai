// app/dashboard/blog-management/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/sanity';
import Link from 'next/link';

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Fetch all posts for management (published and drafts)
    client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`)
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-colors-custom-purple">Blog Management</h1>
        <Link
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-colors-custom-purple text-white px-4 py-2 rounded-md hover:bg-colors-custom-purple/80 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          Open Sanity Studio
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-8 text-gray-600">
          Use Sanity Studio to create, edit, and publish your blog content. The Sanity Studio provides a powerful and flexible content management interface.
        </p>
        
        <h2 className="text-xl font-semibold text-colors-custom-purple mb-4">Recent Posts</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-colors-custom-purple"></div>
              <p className="mt-4 text-colors-custom-purple">Loading posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-500">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-6">
              No blog posts found. Create your first post in Sanity Studio.
            </p>
            <Link
              href="/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-colors-custom-lightpurple text-white px-6 py-2 rounded-md hover:bg-colors-custom-lightpurple/80 transition-colors"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="font-medium text-colors-custom-purple hover:underline"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {post.publishedAt 
                        ? formatDate(post.publishedAt)
                        : <span className="text-amber-500">Draft</span>}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {post._updatedAt && formatDate(post._updatedAt)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-4">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="text-blue-600 hover:text-blue-900"
                          target="_blank"
                        >
                          View
                        </Link>
                        <Link
                          href={`/studio/desk/post;${post._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}