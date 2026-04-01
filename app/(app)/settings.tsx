import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useAuth } from '../../src/store/auth.context';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Manage your account</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  label: {
    color: Colors.muted,
    fontSize: 13,
  },
  value: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});