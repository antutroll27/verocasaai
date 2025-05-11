import React from 'react';
import type { Metadata } from 'next';

// We'll let the page.tsx define metadata dynamically for each blog post
// This allows each blog post to have its own unique title, description, and image

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
