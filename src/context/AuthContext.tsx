import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { MOCK_ADMIN_USER, MOCK_BUYER_USER } from '../data/mockProducts';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  currentUser: UserProfile | null;
  role: UserRole | null;
  isStoreAdmin: boolean;
  isBuyer: boolean;
  loginAs: (role: UserRole, customEmail?: string, customName?: string) => void;
  loginWithCredentials: (email: string, password: string, role: UserRole, customName?: string) => Promise<{ success: boolean; error?: string }>;
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

  const loginWithCredentials = async (
    email: string,
    password: string,
    role: UserRole,
    customName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    if (role === 'loja') {
      // 1. Tentar autenticação no Supabase se configurado
      if (isSupabaseConfigured) {
        try {
          const { data: supaData, error: supaError } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password
          });

          if (!supaError && supaData?.user) {
            const adminUser: UserProfile = {
              id: supaData.user.id,
              email: supaData.user.email || cleanEmail,
              full_name: supaData.user.user_metadata?.full_name || 'Administração HidraElétrica',
              role: 'loja',
              phone: '(31) 9345-1797',
              company_name: 'HidraElétrica',
              address_street: 'Av. Tancredo Neves, 154',
              address_neighborhood: 'Centro',
              address_city: 'Belo Oriente',
              address_state: 'MG',
              address_zip: '35195-000'
            };
            setCurrentUser(adminUser);
            return { success: true };
          }
        } catch (err) {
          console.info('Tentativa Supabase finalizada, usando validação de credencial cadastrada.', err);
        }
      }

      // 2. Validação direta de credenciais da loja
      if (
        (cleanEmail === 'contato@hidraeletrica.com' || cleanEmail === 'admin@hidraeletrica.com.br') &&
        password === 'hidr@eletrica2020'
      ) {
        const adminUser: UserProfile = {
          ...MOCK_ADMIN_USER,
          email: 'contato@hidraeletrica.com',
          full_name: 'Administração HidraElétrica',
          role: 'loja',
          phone: '(31) 9345-1797',
          company_name: 'HidraElétrica',
          address_street: 'Av. Tancredo Neves, 154',
          address_neighborhood: 'Centro',
          address_city: 'Belo Oriente',
          address_state: 'MG',
          address_zip: '35195-000'
        };
        setCurrentUser(adminUser);
        return { success: true };
      }

      return {
        success: false,
        error: 'E-mail ou senha incorretos para o acesso da loja.'
      };
    } else {
      // Perfil de Comprador
      if (!password || password.length < 4) {
        return {
          success: false,
          error: 'A senha deve ter no mínimo 4 caracteres.'
        };
      }

      // Se Supabase estiver ativo, tentar login ou cadastro automático
      if (isSupabaseConfigured) {
        try {
          const { data: supaLogin, error: supaLoginError } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password
          });

          if (!supaLoginError && supaLogin?.user) {
            setCurrentUser({
              id: supaLogin.user.id,
              email: supaLogin.user.email || cleanEmail,
              full_name: customName || supaLogin.user.user_metadata?.full_name || 'Comprador HidraElétrica',
              role: 'comprador',
              phone: '(31) 9345-1797'
            });
            return { success: true };
          }
        } catch (e) {
          console.info('Fallback de login local para comprador', e);
        }
      }

      const buyerUser: UserProfile = {
        id: 'usr-' + Date.now(),
        email: cleanEmail || 'cliente@hidraeletrica.com',
        full_name: customName || 'Cliente Comprador',
        role: 'comprador',
        phone: '(31) 9345-1797'
      };
      setCurrentUser(buyerUser);
      return { success: true };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(() => {});
    }
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
        loginWithCredentials,
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
