import { NextRequest, NextResponse } from 'next/server';
import { client, blogQueries } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter required' }, { status: 400 });
  }
  
  try {
    // Test if we can fetch the blog post
    const post = await client.fetch(blogQueries.postBySlug, { slug });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://verocasaai.com');
    
    const ogImageUrl = `${baseUrl}/blog/${slug}/opengraph-image.png`;
    
    return NextResponse.json({
      success: true,
      post: {
        title: post.title,
        excerpt: post.excerpt,
        author: typeof post.author === 'string' ? post.author : post.author?.name,
        publishedAt: post.publishedAt,
      },
      ogImageUrl,
      baseUrl,
      environment: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        VERCEL_URL: process.env.VERCEL_URL,
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch post',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
