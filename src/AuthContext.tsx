import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from './api/client';

export type UserRole = 'member' | 'editor' | 'admin';
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
  role: UserRole;
  status: UserStatus;
  favorites?: string[];
  createdAt: string;
}

interface AuthContextType {
  user: any | null; // Keep a lightweight user object to mimic firebase user
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthReady: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAuthReady: false,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('MOCK_TOKEN');
      if (!token) throw new Error('No token exists');
      
      const res = await apiClient.get('/api/auth/me');
      setUserProfile(res.data);
    } catch (error: any) {
      console.warn("Auth check failed (or user not logged in):", error.message);
      setUserProfile(null);
      // Clean token if validation fails
      localStorage.removeItem('MOCK_TOKEN');
    } finally {
      setLoading(false);
      setIsAuthReady(true);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async () => {
    const res = await apiClient.post('/api/auth/login');
    if (res.data.token) {
      localStorage.setItem('MOCK_TOKEN', res.data.token);
      await fetchProfile();
    }
  };

  const logout = () => {
    localStorage.removeItem('MOCK_TOKEN');
    setUserProfile(null);
  };

  const user = userProfile ? { uid: userProfile.uid, email: userProfile.email } : null;

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAuthReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
