'use client';

import { Dispatch, ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';

export interface AuthContextValue {
  token: string | undefined;
  setToken: Dispatch<string>;
  removeToken: () => void;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({ token: '', setToken: () => {}, removeToken: () => {} });

export const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined' && !token) {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        setToken(localToken);
      }
    }
  }, [token]);

  const setTokenLocal = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: setTokenLocal, removeToken }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};
