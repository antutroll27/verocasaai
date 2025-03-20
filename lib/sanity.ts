// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-08-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Set up image URL builder
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Helper function to generate full URLs for image sources
export function getSanityImageUrl(source: any) {
  return source ? urlFor(source).url() : '';
}

// GROQ Queries
export const blogQueries = {
  // Get all posts
  allPosts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "excerpt": excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->name
  }`,
  
  // Get post by slug
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "categoryIds": categories[]->_id,
    "author": author->name,
    "authorImage": author->image
  }`,
  
  // Get popular posts (most recent for now)
  popularPosts: `*[_type == "post" && defined(slug.current)][0...5] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage
  }`,
  
  // Get all categories
  allCategories: `*[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    description
  }`,
  
  // Get related posts (based on category)
  relatedPosts: `*[_type == "post" && count((categories[]->_id)[@ in $categoryIds]) > 0 && _id != $postId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    "excerpt": excerpt,
    mainImage,
    publishedAt
  }`,
  
  // Get posts by category ID
  postsByCategory: `*[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "excerpt": excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->name
  }`
};