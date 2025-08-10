import { Metadata, ResolvingMetadata } from 'next';
import { client, blogQueries } from '@/lib/sanity';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Get the blog post data
  // Note: In this case params.slug is a simple string and doesn't need to be awaited
  // But we're careful about how we handle it
  const post = await client.fetch(blogQueries.postBySlug, { slug: params.slug });
  
  // Use parent metadata as fallback values
  const previousImages = (await parent).openGraph?.images || [];
  
  if (!post) {
    throw new Error(`Post not found for slug: ${params.slug}`);
  }
  
  // Get the base URL from environment or default to production URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://verocasaai.com';
  
  // Prepare OG image URL - use the generated OpenGraph image (must include extension)
  const ogImageUrl = `${baseUrl}/blog/${params.slug}/opengraph-image.png`;
  
  // Make sure we have a decent excerpt - either from the post or from the body
  let excerpt = post.excerpt || '';
  if (!excerpt && post.body) {
    // Extract text from the first block if it's a block content
    if (Array.isArray(post.body)) {
      const firstTextBlock = post.body.find((block: any) => block._type === 'block');
      if (firstTextBlock && firstTextBlock.children) {
        excerpt = firstTextBlock.children
          .filter((child: any) => child._type === 'span')
          .map((span: any) => span.text)
          .join(' ')
          .slice(0, 200) + '...';
      }
    }
  }
  
  // Fallback if we still don't have an excerpt
  if (!excerpt) {
    excerpt = `Read this article about ${post.title} on VerocasaAI Blog`;
  }
  
  return {
    title: `${post.title} | VerocasaAI`,
    description: excerpt,
    authors: [{ name: typeof post.author === 'string' ? post.author : post.author?.name || 'VerocasaAI' }],
    keywords: post.categories?.map((cat: any) => cat.title) || ['interior design', 'AI', 'VerocasaAI'],
    openGraph: {
      title: post.title,
      description: excerpt,
      url: `${baseUrl}/blog/${params.slug}`,
      siteName: 'VerocasaAI',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [ogImageUrl],
      creator: '@verocasaai',
      site: '@verocasaai',
    },
    // Additional meta tags for better social sharing
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'twitter:image:src': ogImageUrl,
      'twitter:image:width': '1200',
      'twitter:image:height': '630',
      'article:author': typeof post.author === 'string' ? post.author : post.author?.name || 'VerocasaAI',
      'article:published_time': post.publishedAt,
      'article:section': 'Interior Design',
      'fb:app_id': process.env.FACEBOOK_APP_ID || '',
    },
  };
}
