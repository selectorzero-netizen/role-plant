export type Role = 'public' | 'member' | 'editor' | 'admin';
export type Status = 'pending' | 'approved';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
  joinedAt?: string;
  [key: string]: any;
}

export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description?: string;
  detailedDescription?: string;

  // Level 1: Fixed Statuses
  status: 'draft' | 'exhibiting' | 'sold' | 'hidden';
  visibility: 'public' | 'private';
  featuredOnHome: boolean;
  availableForApplication: boolean;

  // Level 2: Controlled Categories
  grade: 'S' | 'A' | 'B' | 'Starter' | '';
  category: string;

  // Level 3: Free Tags
  tags: string[];

  // Media
  images: { url: string; isCover: boolean; index: number }[];

  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  body: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  authorId?: string;
  featuredOnHome: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  pinned: boolean;
  link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberApplication {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  [key: string]: any;
}
