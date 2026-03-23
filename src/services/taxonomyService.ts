/**
 * taxonomyService.ts
 * 
 * Handles configurable categories and grades.
 */
import { db } from '../firebase';
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
import { Taxonomy, TaxonomyType } from '../types';




export const taxonomyService = {
  /**
   * Get taxonomy items by type
   */
  async getByType(type: TaxonomyType, onlyActive = true) {
    
    try {
      const colRef = collection(db, 'taxonomy');
      let q = query(
        colRef, 
        where('type', '==', type),
        orderBy('sortOrder', 'asc'),
        orderBy('createdAt', 'desc')
      );
  
      if (onlyActive) {
        q = query(q, where('isActive', '==', true));
      }
  
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Taxonomy[];
    } catch (err) {
      console.error(`taxonomyService.getByType(${type}) failed:`, err);
      return [];
    }
  },

  /**
   * Create taxonomy item
   */
  async create(data: Omit<Taxonomy, 'id' | 'createdAt' | 'updatedAt'>) {
    const colRef = collection(db, 'taxonomy');
    return addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  },

  /**
   * Update taxonomy item
   */
  async update(id: string, data: Partial<Taxonomy>) {
    const docRef = doc(db, 'taxonomy', id);
    return updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  /**
   * Delete taxonomy item
   */
  async delete(id: string) {
    const docRef = doc(db, 'taxonomy', id);
    return deleteDoc(docRef);
  }
};
