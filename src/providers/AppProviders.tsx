import React from 'react';
import '../i18n';
import { AuthProvider } from '../store/auth.context';
import { ThemeProvider } from '../theme/ThemeContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}