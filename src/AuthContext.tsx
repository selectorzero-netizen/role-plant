import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { UserProfile, UserRole, Status } from './types';
import { authService } from './services/authService';

// ─── DEV ONLY ────────────────────────────────────────────────────────────────
// This entire block is dead code in production: import.meta.env.DEV === false
// at build time, and Vite/esbuild will tree-shake it completely.
const DEV_ADMIN_PROFILE: UserProfile | null = import.meta.env.DEV
  ? {
      uid: 'dev-admin-bypass',
      email: 'dev@roleplant.local',
      name: 'DEV Admin',
      role: 'super_admin' as UserRole,
      status: 'approved' as Status,
      favorites: [],
      createdAt: '',
    }
  : null;

const isDevAdminBypass = () => 
  import.meta.env.DEV && (
    localStorage.getItem('__dev_admin__') === '1' || 
    window.location.pathname.startsWith('/admin')
  );
// ─────────────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthReady: boolean;
  authError: string | null;
  login: () => Promise<void>;
  logout: () => void;
  retryInit: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAuthReady: false,
  authError: null,
  login: async () => {},
  logout: () => {},
  retryInit: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // DEV bypass: short-circuit everything if localStorage flag is set
  if (import.meta.env.DEV && isDevAdminBypass()) {
    return (
      <AuthContext.Provider value={{
        user: null,
        userProfile: DEV_ADMIN_PROFILE,
        loading: false,
        isAuthReady: true,
        authError: null,
        login: async () => {},
        logout: () => {
          localStorage.removeItem('__dev_admin__');
          window.location.reload();
        },
        retryInit: () => {},
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return <AuthProviderReal>{children}</AuthProviderReal>;
};

// Moved real Firebase logic into a separate internal component so the bypass
// path above never initializes Firebase listeners at all.
const AuthProviderReal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const initProfile = async (firebaseUser: User) => {
    setLoading(true);
    setAuthError(null);
    setIsAuthReady(false);
    try {
      const profilePromise = authService.initializeProfileIfNew(
        firebaseUser.uid,
        firebaseUser.email,
        firebaseUser.displayName
      );
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Profile fetch timeout')), 20000));
      const profile = await Promise.race([profilePromise, timeoutPromise]) as UserProfile;
      setUserProfile(profile);
      setIsAuthReady(true);
    } catch (error) {
      console.error("Error fetching or initializing profile:", error);
      setUserProfile(null);
      setAuthError("無法載入會員資料 (連線超時或初始失敗)。");
      setIsAuthReady(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await initProfile(firebaseUser);
      } else {
        setUserProfile(null);
        setAuthError(null);
        setIsAuthReady(true);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (retryTrigger > 0 && user) {
      initProfile(user);
    }
  }, [retryTrigger]);

  const retryInit = () => setRetryTrigger(prev => prev + 1);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAuthReady, authError, login, logout, retryInit }}>
      {children}
    </AuthContext.Provider>
  );
};
