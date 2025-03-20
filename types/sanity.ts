// types/sanity.ts
import { PortableTextBlock } from '@portabletext/types';

export interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: SanityImage;
  body: PortableTextBlock[];
  publishedAt: string;
  categories?: Category[] | string[];
  categoryIds?: string[];
  author?: Author | string;
  authorImage?: SanityImage;
  isFeatured?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface PostPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  categories?: string[];
  author?: string;
}