import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useAuth } from '../../src/store/auth.context';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}</Text>
      <Text style={styles.subtitle}>Your creator workspace is ready.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick actions</Text>
        <Link href="/create" style={styles.link}>Create new project</Link>
        <Link href="/projects" style={styles.link}>View projects</Link>
        <Link href="/settings" style={styles.link}>Settings</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 24,
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  link: {
    color: Colors.primary,
    marginBottom: 10,
    fontSize: 16,
  },
});