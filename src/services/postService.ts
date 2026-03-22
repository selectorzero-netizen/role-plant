/**
 * postService.ts
 * 
 * Handles Blog Posts / Articles.
 */
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy, 
  where,
  limit,
  serverTimestamp 
} from 'firebase/firestore';

export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  status: PostStatus;
  publishedAt: any;
  createdAt: any;
  updatedAt: any;
}

export type PostFilters = {
  status?: PostStatus;
  category?: string;
};

export const postService = {
  /**
   * Create a new post
   */
  async createPost(data: Partial<Post>) {
    const colRef = collection(db, 'posts');
    const docData = {
      title: '',
      slug: '',
      summary: '',
      content: '',
      coverImageUrl: '',
      category: '',
      tags: [],
      status: 'draft' as PostStatus,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    return addDoc(colRef, docData);
  },

  /**
   * Get all posts for admin
   */
  async getPosts(filters: PostFilters = {}) {
    const colRef = collection(db, 'posts');
    let q = query(colRef, orderBy('createdAt', 'desc'));

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[];
  },

  /**
   * Get post by ID
   */
  async getPostById(id: string) {
    const docRef = doc(db, 'posts', id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Post;
  },

  /**
   * Get post by Slug (for public site)
   */
  async getPostBySlug(slug: string) {
    const colRef = collection(db, 'posts');
    const q = query(
      colRef, 
      where('status', '==', 'published'), 
      where('slug', '==', slug), 
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Post;
  },

  /**
   * Update post
   */
  async updatePost(id: string, data: Partial<Post>) {
    const docRef = doc(db, 'posts', id);
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };
    
    // If status is being changed to published, set publishedAt
    if (data.status === 'published') {
      (updateData as any).publishedAt = serverTimestamp();
    }

    return updateDoc(docRef, updateData);
  },

  /**
   * Delete post
   */
  async deletePost(id: string) {
    const docRef = doc(db, 'posts', id);
    return deleteDoc(docRef);
  }
};
