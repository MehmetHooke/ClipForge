import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { useAuth } from '../../src/store/auth.context';

export default function HomePage() {
  const {t} = useTranslation();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('home.welcome')}, {user?.name}</Text>
      <Text style={styles.subtitle}>{t('home.workspaceReady')}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('home.quickActions')}</Text>
        <Link href="/create" style={styles.link}>{t('home.newProject')}</Link>
        <Link href="/projects" style={styles.link}>{t('home.viewProjects')}</Link>
        <Link href="/settings" style={styles.link}>{t('common.settings')}</Link>
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