import { ImageResponse } from 'next/og';
import { client, blogQueries, getSanityImageUrl } from '@/lib/sanity';

// Route segment config
export const runtime = 'edge';
export const revalidate = 3600; // Revalidate these images every hour

// Image metadata
export const alt = 'Blog post image';
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image({ params }: { params: { slug: string } }): Promise<ImageResponse> {
  try {
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
    
    // Get image URL with proper dimensions for OG image
    let imageUrl = '';
    if (post.mainImage) {
      // Ensure we get a properly sized image for OG
      imageUrl = getSanityImageUrl(post.mainImage) + '?w=1200&h=630&fit=crop&crop=entropy';
    }
    
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
            color: '#000', // Ensure text is visible
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
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
    
    // Try to extract the slug to use in the fallback image
    const slugStr = String(params.slug);
    // Convert slug to a readable title (replace hyphens with spaces and capitalize words)
    const readableTitle = slugStr
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Return a fallback image in case of any errors
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
          <div style={{ color: '#6946af', marginBottom: 24, fontWeight: 'bold' }}>VerocasaAI Blog</div>
          <div style={{ fontSize: 36, color: '#333', textAlign: 'center', padding: '0 48px', lineHeight: 1.4 }}>{readableTitle}</div>
        </div>
      ),
      { ...size }
    );
  }
}
