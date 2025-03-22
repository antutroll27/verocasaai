// app/blog/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/home/navbar';
import FooterSection from '@/components/home/footer';
import { client, blogQueries } from '@/lib/sanity';
import { PostPreview, Category } from '@/types/sanity';
import BlogList from '@/components/blog/BlogList';
import CategoryList from '@/components/blog/CategoryList';
import PopularPosts from '@/components/blog/PopularPosts';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams?.get('category');
  const pageParam = searchParams?.get('page');
  
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [popularPosts, setPopularPosts] = useState<PostPreview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Load initial data
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam, 10) || 1 : 1;
    setCurrentPage(page);
    
    setIsLoading(true);
    
    // Fetch all categories
    client.fetch(blogQueries.allCategories)
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
    
    // Fetch popular posts
    client.fetch(blogQueries.popularPosts)
      .then(data => setPopularPosts(data))
      .catch(err => console.error('Error fetching popular posts:', err));
    
    // Fetch posts (either all or by category)
    if (categorySlug) {
      // First we need to get the category ID
      client.fetch(`*[_type == "category" && slug.current == $slug][0]._id`, { slug: categorySlug })
        .then(categoryId => {
          if (categoryId) {
            return client.fetch(blogQueries.postsByCategory, { categoryId });
          } else {
            throw new Error('Category not found');
          }
        })
        .then(data => {
          setPosts(data);
          setTotalPosts(data.length);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching posts by category:', err);
          setError('Failed to load posts');
          setIsLoading(false);
        });
    } else {
      // Fetch all posts
      client.fetch(blogQueries.allPosts)
        .then(data => {
          setPosts(data);
          setTotalPosts(data.length);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching all posts:', err);
          setError('Failed to load posts');
          setIsLoading(false);
        });
    }
  }, [categorySlug, pageParam]);
  
  // Get current posts for pagination
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    // Update URL with new page number
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', page.toString());
    
    // Only set category if it exists, otherwise remove it
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    
    router.push(`/blog?${params.toString()}`);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-colors-custom-purple mb-4">
          Articoli del blog di VeroCasa
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           From trending décor to advanced AI techniques, we blend style with innovation to help you create spaces that truly inspire.
          </p>
        </div>
        
        <CategoryList categories={categories} activeCategory={categorySlug || ''} />
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content area */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-24">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-colors-custom-purple"></div>
                  <p className="mt-4 text-colors-custom-purple">Loading posts...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-red-500 mb-4">
                  {error}
                </h3>
                <p className="text-gray-600 mb-8">
                  Something went wrong while loading the blog posts.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-colors-custom-purple text-white px-4 py-2 rounded-md hover:bg-colors-custom-purple/80 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <BlogList 
                posts={currentPosts}
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 space-y-10">
            {/* Newsletter signup */}
            <div className="bg-colors-custom-purple/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-colors-custom-purple mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest design tips and AI innovations delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input 
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-colors-custom-purple focus:border-colors-custom-purple"
                />
                <button
                  className="w-full bg-colors-custom-lightpurple text-white p-3 rounded-md hover:bg-colors-custom-lightpurple/80 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Popular posts */}
            {popularPosts && popularPosts.length > 0 && (
              <PopularPosts posts={popularPosts} />
            )}
            
            {/* Ad or promo */}
            <div className="bg-colors-custom-pink/30 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold text-colors-custom-purple mb-3">
                Transform Your Space Today
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Use our AI to redesign your room in just a few clicks!
              </p>
              <Link 
                href="/dashboard/ai-redesign"
                className="inline-block bg-colors-custom-purple text-white px-4 py-2 rounded-md hover:bg-colors-custom-purple/80 transition-colors flex items-center gap-5 justify-center"
              >
                <Sparkles className="animate-pulse" size={16} />
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
}