import { db } from '../firebase';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  updateDoc, 
  getDoc,
  orderBy
} from 'firebase/firestore';
import { UserProfile, MemberApplication } from '../types';

export interface ApplicationWithUser extends MemberApplication {
  user?: UserProfile;
}

export const adminService = {
  // Members
  getAllMembers: async (): Promise<UserProfile[]> => {
    const q = query(collection(db, 'profiles'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
  },

  updateMemberStatus: async (uid: string, status: UserProfile['status']) => {
    await updateDoc(doc(db, 'profiles', uid), { status, updatedAt: new Date().toISOString() });
  },

  updateMemberRole: async (uid: string, role: UserProfile['role']) => {
    await updateDoc(doc(db, 'profiles', uid), { role, updatedAt: new Date().toISOString() });
  },

  // Applications (Plant Procurement)
  getAllApplications: async (): Promise<ApplicationWithUser[]> => {
    const q = query(collection(db, 'applications'));
    const snapshot = await getDocs(q);
    const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MemberApplication));
    
    // Join with user data
    const enrichedApps = await Promise.all(apps.map(async (app) => {
      const userDoc = await getDoc(doc(db, 'profiles', app.userId));
      return {
        ...app,
        user: userDoc.exists() ? (userDoc.data() as UserProfile) : undefined
      };
    }));
    
    return enrichedApps;
  },

  updateApplicationStatus: async (appId: string, status: MemberApplication['status']) => {
    await updateDoc(doc(db, 'applications', appId), { 
      status, 
      updatedAt: new Date().toISOString() 
    });
  }
};
