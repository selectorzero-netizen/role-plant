/**
 * inquiryService.ts
 * 
 * Handles General and Business inquiries.
 */
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';


export type InquiryStatus = 'new' | 'in_progress' | 'closed';
export type InquiryType = 'general' | 'business';

export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  message: string;
  company?: string; // Business only
  status: InquiryStatus;
  isRead: boolean;
  createdAt: any;
  updatedAt: any;
}

export type InquiryFilters = {
  type?: InquiryType;
  status?: InquiryStatus;
};


export const inquiryService = {
  /**
   * Submit a new inquiry from public site
   */
  async submitInquiry(data: {
    type: InquiryType;
    name: string;
    email: string;
    message: string;
    company?: string;
  }) {
    const docData = {
      ...data,
      status: 'new' as InquiryStatus,
      isRead: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const colRef = collection(db, 'inquiries');
    return addDoc(colRef, docData);
  },

  /**
   * Get inquiries for admin with optional filters
   */
  async getInquiries(filters: InquiryFilters = {}) {
    const colRef = collection(db, 'inquiries');
    let q = query(colRef, orderBy('createdAt', 'desc'));

    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Inquiry[];
  },

  /**
   * Update inquiry status
   */
  async updateInquiryStatus(id: string, status: InquiryStatus) {

    const docRef = doc(db, 'inquiries', id);
    return updateDoc(docRef, { 
      status,
      updatedAt: serverTimestamp()
    });
  },

  /**
   * Toggle read status
   */
  async toggleReadStatus(id: string, isRead: boolean) {

    const docRef = doc(db, 'inquiries', id);
    return updateDoc(docRef, { 
      isRead,
      updatedAt: serverTimestamp()
    });
  }
};
