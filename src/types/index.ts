export type UserRole = 'super_admin' | 'admin' | 'editor' | 'member' | 'guest';
export type Status = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  status: Status;
  joinedAt?: string;
  [key: string]: any;
}

export interface Plant {
  id: string;
  name: string;
  localName?: string;
  scientificName?: string;
  serialNumber?: string;
  description?: string;
  detailedDescription?: string;
  price?: number;
  coverImageUrl?: string;

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

export type ArticleCategory = 'knowledge' | 'guide' | 'story' | 'interview';
export type NoticeCategory = 'system' | 'event' | 'release';
export type AccessLevel = 'public' | 'member' | 'vip';

export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  body: string;
  excerpt?: string;
  status: 'draft' | 'published' | 'archived';
  category: ArticleCategory;
  accessLevel: AccessLevel;
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
  category: NoticeCategory;
  accessLevel: AccessLevel;
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

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'plant' | 'post' | 'content' | 'media' | 'member' | 'application';
  entityId: string;
  details: string;
  before?: any;
  after?: any;
  createdAt: string;
}

export type TaxonomyType = 'plant_category' | 'plant_grade' | 'post_category';

export interface Taxonomy {
  id: string;
  type: TaxonomyType;
  key: string;
  label: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
}
