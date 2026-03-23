/**
 * mediaService.ts
 * 
 * Handles Media Assets (Images) in Firebase Storage and Firestore.
 */
import { storage, db } from '../firebase';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

export type MediaUsage = 'plant' | 'post' | 'content' | 'general';

export interface Media {
  id: string;
  fileName: string;
  url: string;
  type: string;
  alt: string;
  usage: MediaUsage;
  createdAt: any;
  updatedAt: any;
  isActive: boolean;
  storagePath: string;
}

export type MediaFilters = {
  usage?: MediaUsage;
  isActive?: boolean;
};

export const mediaService = {
  /**
   * Upload a file to storage and record in firestore
   */
  async uploadMedia(file: File, metadata: Partial<Media>, onProgress?: (progress: number) => void) {
    const fileName = `${Date.now()}_${file.name}`;
    const storagePath = `media/${metadata.usage || 'general'}/${fileName}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Create document in Firestore
          const docRef = await addDoc(collection(db, 'media'), {
            fileName: file.name,
            url: downloadURL,
            type: file.type,
            alt: metadata.alt || '',
            usage: metadata.usage || 'general',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isActive: true,
            storagePath: storagePath
          });

          resolve(docRef.id);
        }
      );
    });
  },

  /**
   * Get media list
   */
  async getMediaList(filters: MediaFilters = {}) {
    const colRef = collection(db, 'media');
    // Only orderBy — avoid composite index requirement
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    })) as Media[];

    // Client-side filtering (safe, no index needed)
    if (filters.usage) {
      results = results.filter(m => m.usage === filters.usage);
    }
    if (filters.isActive !== undefined) {
      results = results.filter(m => m.isActive === filters.isActive);
    }

    return results;
  },

  /**
   * Toggle active state
   */
  async toggleMediaActive(id: string, isActive: boolean) {
    const docRef = doc(db, 'media', id);
    return updateDoc(docRef, { isActive, updatedAt: serverTimestamp() });
  },

  /**
   * Delete media (Storage + Firestore)
   */
  async deleteMedia(id: string, storagePath: string) {
    // 1. Delete from Storage
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    } catch (error) {
      console.warn("Storage deletion error (maybe already missing):", error);
    }

    // 2. Delete from Firestore
    const docRef = doc(db, 'media', id);
    return deleteDoc(docRef);
  }
};
