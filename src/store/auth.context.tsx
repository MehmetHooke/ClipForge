import React, { createContext, useContext, useMemo, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const value = useMemo(
    () => ({
      user,
      login: (email: string) =>
        setUser({
          id: '1',
          name: 'Mehmet',
          email,
        }),
      register: (name: string, email: string) =>
        setUser({
          id: '1',
          name,
          email,
        }),
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}