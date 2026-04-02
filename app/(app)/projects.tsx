import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../src/constants/colors';

export default function ProjectsPage() {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('projects.title')}</Text>
      <Text style={styles.subtitle}>{t('projects.subtitle')}</Text>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>{t('projects.empty')}</Text>
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
    marginBottom: 20,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
  },
  emptyText: {
    color: Colors.muted,
  },
});