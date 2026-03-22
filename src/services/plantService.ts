import { db } from '../firebase';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { Plant } from '../types';

const PLANTS_COLLECTION = 'plants';

export const plantService = {
  // Public Fetchers
  async getPublicPlants(): Promise<Plant[]> {
    const q = query(collection(db, PLANTS_COLLECTION), where('visibility', '==', 'public'));
    const snapshot = await getDocs(q);
    
    // Filter out drafts locally just in case, though ideally, rule or better query handles this.
    // We only want 'exhibiting' or 'sold' on public.
    const plants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plant));
    return plants.filter(p => p.status === 'exhibiting' || p.status === 'sold');
  },

  async getFeaturedPlants(): Promise<Plant[]> {
    // Requires composite index if we queried by featuredOnHome & visibility. We'll do simple query.
    const q = query(collection(db, PLANTS_COLLECTION), where('featuredOnHome', '==', true));
    const snapshot = await getDocs(q);
    const plants = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plant));
    return plants.filter(p => p.visibility === 'public' && (p.status === 'exhibiting' || p.status === 'sold'));
  },

  async getPlantById(id: string): Promise<Plant | null> {
    const docSnap = await getDoc(doc(db, PLANTS_COLLECTION, id));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Plant;
  },

  // Admin Fetchers
  async getAllPlantsAdmin(): Promise<Plant[]> {
    const q = query(collection(db, PLANTS_COLLECTION));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plant));
  },

  // Admin Mutations
  async createDraftPlant(initialName: string = '未命名植株'): Promise<string> {
    const newDocRef = await addDoc(collection(db, PLANTS_COLLECTION), {
      name: initialName,
      localName: '',
      scientificName: '',
      serialNumber: '',
      description: '',
      detailedDescription: '',
      price: null,
      coverImageUrl: '',
      status: 'draft',
      visibility: 'private',
      featuredOnHome: false,
      availableForApplication: false,
      grade: '',
      category: '',
      tags: [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return newDocRef.id;
  },

  async updatePlant(id: string, updates: Partial<Plant>): Promise<void> {
    const docRef = doc(db, PLANTS_COLLECTION, id);
    await updateDoc(docRef, { ...updates, updatedAt: new Date().toISOString() });
  },

  async deletePlant(id: string): Promise<void> {
    await deleteDoc(doc(db, PLANTS_COLLECTION, id));
  }
};
