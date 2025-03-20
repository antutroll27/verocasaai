// app/blog/[slug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/home/navbar';
import FooterSection from '@/components/home/footer';
import { client, blogQueries, getSanityImageUrl } from '@/lib/sanity';
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';
import { Post, PostPreview } from '@/types/sanity';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<PostPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!slug) return;
    
    setIsLoading(true);
    setError(null);
    
    // Fetch post data
    client.fetch(blogQueries.postBySlug, { slug })
      .then(postData => {
        if (!postData) {
          throw new Error('Post not found');
        }
        
        setPost(postData);
        
        // Fetch related posts
        if (postData._id && postData.categoryIds && postData.categoryIds.length > 0) {
          return client.fetch(blogQueries.relatedPosts, {
            postId: postData._id,
            categoryIds: postData.categoryIds
          });
        }
        
        return [];
      })
      .then(relatedData => {
        setRelatedPosts(relatedData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setError(err.message || 'Failed to load post');
        setIsLoading(false);
        
        // Redirect to blog list after a short delay if post not found
        if (err.message === 'Post not found') {
          setTimeout(() => {
            router.push('/blog');
          }, 3000);
        }
      });
  }, [slug, router]);
  
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-32 min-h-screen">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-colors-custom-purple"></div>
              <p className="mt-4 text-colors-custom-purple">Loading post...</p>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-32 min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-colors-custom-purple mb-4">
              {error === 'Post not found' ? 'Post Not Found' : 'Error'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error === 'Post not found' 
                ? "Sorry, the blog post you're looking for doesn't exist." 
                : error}
            </p>
            <Link 
              href="/blog" 
              className="bg-colors-custom-lightpurple text-white px-6 py-2 rounded-md hover:bg-colors-custom-lightpurple/80 transition-colors"
            >
              Return to Blog
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }
  
  if (!post) {
    return null;
  }
  
  const imageUrl = post.mainImage ? getSanityImageUrl(post.mainImage) : '';
  
  return (
    <div>
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="text-colors-custom-purple flex items-center hover:underline"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Blog
          </Link>
        </div>
        
        {/* Blog post header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-colors-custom-purple mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-4">By {typeof post.author === 'string' ? post.author : post.author?.name}</span>
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt)}</span>
            )}
          </div>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category, index) => (
                <Link 
                  key={index}
                  href={`/blog?category=${typeof category === 'string' ? category.toLowerCase() : category.slug}`}
                  className="bg-colors-custom-pink/30 text-colors-custom-purple px-3 py-1 rounded-full text-sm hover:bg-colors-custom-pink/50 transition-colors"
                >
                  {typeof category === 'string' ? category : category.title}
                </Link>
              ))}
            </div>
          )}
        </header>
        
        {/* Featured image */}
        {imageUrl && (
          <div className="relative h-[400px] w-full mb-10 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Blog content */}
        <article className="prose prose-lg max-w-none prose-headings:text-colors-custom-purple prose-a:text-colors-custom-lightpurple">
          <PortableTextRenderer content={post.body} />
        </article>
        
        {/* Share buttons */}
        <div className="mt-10 border-t border-b border-gray-200 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <div className="flex flex-wrap gap-2">
              {/* Twitter */}
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${slug}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-opacity-80 transition-all"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              
              {/* Facebook */}
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${slug}`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#3b5998] text-white p-2 rounded-full hover:bg-opacity-80 transition-all"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Author bio section */}
        <div className="mt-16 p-8 bg-colors-custom-pink/20 rounded-lg">
          <h3 className="text-2xl font-bold text-colors-custom-purple mb-4">About the Author</h3>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-24 rounded-full bg-colors-custom-purple flex items-center justify-center text-white text-2xl font-bold">
              {typeof post.author === 'string' 
                ? post.author.charAt(0) 
                : post.author?.name.charAt(0) || 'A'}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-colors-custom-purple mb-2">
                {typeof post.author === 'string' ? post.author : post.author?.name}
              </h4>
              <p className="text-gray-600">
                Interior design enthusiast and contributor at VerocasaAI. Passionate about transforming spaces and helping people create their dream homes with the power of AI.
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-colors-custom-purple mb-6">Related Posts</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  href={`/blog/${relatedPost.slug.current}`} 
                  key={relatedPost._id}
                  className="group"
                >
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      {relatedPost.mainImage ? (
                        <Image
                          src={getSanityImageUrl(relatedPost.mainImage)}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full w-full bg-colors-custom-pink flex items-center justify-center">
                          <span className="text-colors-custom-purple text-xl font-semibold">VerocasaAI</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-colors-custom-purple group-hover:text-colors-custom-lightpurple transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      
                      {relatedPost.excerpt && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <FooterSection />
    </div>
  );
}