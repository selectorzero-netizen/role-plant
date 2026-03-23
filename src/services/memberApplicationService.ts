import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { MemberApplication } from '../types';

export const memberApplicationService = {
  getApplicationsByUser: async (userId: string): Promise<MemberApplication[]> => {

    const q = query(collection(db, 'applications'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as MemberApplication));
  },
  createApplication: async (data: Omit<MemberApplication, 'id' | 'createdAt'>) => {

    await addDoc(collection(db, 'applications'), {
      ...data,
      createdAt: serverTimestamp()
    });
  }
};
