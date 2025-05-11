import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { client, blogQueries, getSanityImageUrl } from '@/lib/sanity';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blog post image';
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }): Promise<ImageResponse> {
  // Extract slug as a string to avoid direct params access issues
  const slugStr = String(params.slug);
  
  // Fetch post data
  const post = await client.fetch(blogQueries.postBySlug, { slug: slugStr });
  
  if (!post) {
    // Fallback image if post not found
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#fff',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div style={{ color: '#6946af', marginBottom: 24 }}>VerocasaAI</div>
          <div style={{ fontSize: 28, color: '#333' }}>Blog Post Not Found</div>
        </div>
      ),
      { ...size }
    );
  }
  
  const imageUrl = post.mainImage ? getSanityImageUrl(post.mainImage) : '';
  
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#fff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 48,
          position: 'relative',
        }}
      >
        {/* Background image overlay */}
        {imageUrl && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 0,
          }} />
        )}
        
        {/* Content */}
        <div style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}>
          <div style={{ color: '#6946af', fontSize: 28, fontWeight: 'bold' }}>VerocasaAI Blog</div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}>
            <div style={{ fontWeight: 'bold', color: '#333', textAlign: 'center', lineHeight: 1.4 }}>
              {post.title}
            </div>
          </div>
          
          <div style={{ 
            fontSize: 18, 
            color: '#555',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <div>By {typeof post.author === 'string' ? post.author : post.author?.name || 'VerocasaAI'}</div>
            <div>{new Date(post.publishedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
