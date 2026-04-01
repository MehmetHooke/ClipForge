import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/store/auth.context';

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}