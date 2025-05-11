import React from 'react';
import type { Metadata } from 'next';

// Static metadata that will apply to all blog posts
export const metadata: Metadata = {
  title: 'VerocasaAI Blog',
  description: 'Explore the latest in AI-powered interior design and innovation',
  openGraph: {
    type: 'article',
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
