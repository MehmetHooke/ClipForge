import { Redirect } from 'expo-router';
import { useAuth } from '../src/store/auth.context';

export default function IndexPage() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}