import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useProject } from '../../store/project.context';

export default function WorkspaceScreen() {
  const { t } = useTranslation();
  const { currentDraft, generatedOutputs } = useProject();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('workspace.title')} (Mobile)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{currentDraft?.title ?? '-'}</Text>

        <Text style={styles.label}>Raw Input</Text>
        <Text style={styles.value}>{currentDraft?.rawInput ?? '-'}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('workspace.generatedOutputs')}</Text>

      {generatedOutputs.map((output) => (
        <View key={output.id} style={styles.card}>
          <Text style={styles.cardTitle}>{output.title}</Text>
          <Text style={styles.cardContent}>{output.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  label: {
    color: Colors.muted,
    marginBottom: 6,
    marginTop: 8,
  },
  value: {
    color: Colors.text,
  },
  cardTitle: {
    color: Colors.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardContent: {
    color: Colors.text,
    lineHeight: 22,
  },
});