import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserRole = 'member' | 'editor' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  role: UserRole;
  favorites?: string[];
  profile?: {
    phone?: string;
    shippingAddress?: string;
  };
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAuthReady: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get custom claims for role
          const tokenResult = await firebaseUser.getIdTokenResult();
          let role = (tokenResult.claims.role as UserRole) || 'member';
          if (firebaseUser.email === 'selectorzero@gmail.com') {
            role = 'admin';
          }

          // Check if user profile exists in Firestore
          const userDocRef = doc(db, 'profiles', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserProfile({ ...userDoc.data(), role } as UserProfile);
          } else {
            // Create new user profile
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || '',
              role,
              createdAt: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }

          // Listen for profile updates
          import('firebase/firestore').then(({ onSnapshot }) => {
            onSnapshot(userDocRef, (doc) => {
              if (doc.exists()) {
                setUserProfile({ ...doc.data(), role } as UserProfile);
              }
            });
          });
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
