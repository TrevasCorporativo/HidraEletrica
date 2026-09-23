import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { MOCK_ADMIN_USER, MOCK_BUYER_USER } from '../data/mockProducts';

interface AuthContextType {
  currentUser: UserProfile | null;
  role: UserRole | null;
  isStoreAdmin: boolean;
  isBuyer: boolean;
  loginAs: (role: UserRole, customEmail?: string, customName?: string) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hidraeletrica_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const loginAs = (role: UserRole, customEmail?: string, customName?: string) => {
    if (role === 'loja') {
      setCurrentUser({
        ...MOCK_ADMIN_USER,
        email: customEmail || MOCK_ADMIN_USER.email,
        full_name: customName || MOCK_ADMIN_USER.full_name
      });
    } else {
      setCurrentUser({
        ...MOCK_BUYER_USER,
        email: customEmail || MOCK_BUYER_USER.email,
        full_name: customName || MOCK_BUYER_USER.full_name
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    setCurrentUser(prev => prev ? { ...prev, ...updatedData } : null);
  };

  const role = currentUser?.role || null;
  const isStoreAdmin = role === 'loja';
  const isBuyer = role === 'comprador';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isStoreAdmin,
        isBuyer,
        loginAs,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
