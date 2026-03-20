import { db } from '../firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

export const profileService = {
  getProfile: async (uid: string): Promise<UserProfile | null> => {
    const d = await getDoc(doc(db, 'profiles', uid));
    if (d.exists()) return d.data() as UserProfile;
    return null;
  },
  updateProfile: async (uid: string, data: Partial<UserProfile>) => {
    await updateDoc(doc(db, 'profiles', uid), data);
  },
  createProfile: async (uid: string, data: UserProfile) => {
    await setDoc(doc(db, 'profiles', uid), data);
  }
};
