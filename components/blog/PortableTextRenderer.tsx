// components/blog/PortableTextRenderer.tsx
'use client';

import React from 'react';
import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import Link from 'next/link';
import { getSanityImageUrl } from '@/lib/sanity';

interface PortableTextRendererProps {
  content: PortableTextBlock[];
}

// Custom components for the PortableText renderer
const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = getSanityImageUrl(value);
      return (
        <div className="relative w-full h-[400px] my-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            fill
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    callout: ({ value }: any) => (
      <div className={`p-4 my-6 rounded-md border-l-4 ${value.type === 'info' ? 'bg-blue-50 border-blue-500' : value.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-gray-50 border-gray-500'}`}>
        <p className="text-sm">{value.text}</p>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-colors-custom-lightpurple underline hover:text-colors-custom-lightpurple/80 transition-colors"
        >
          {children}
        </Link>
      );
    },
    highlight: ({ children }: any) => (
      <span className="bg-colors-custom-pink/30 px-1 rounded">{children}</span>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-colors-custom-purple">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-colors-custom-purple">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-3 text-colors-custom-purple">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-5 mb-2 text-colors-custom-purple">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-colors-custom-pink pl-4 italic my-6 text-gray-700">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
};

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ content }) => {
  if (!content) {
    return null;
  }
  
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-colors-custom-purple prose-a:text-colors-custom-lightpurple">
      <PortableText value={content} components={components} />
    </div>
  );
};

export default PortableTextRenderer;