import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useProject } from '../../store/project.context';

export default function WorkspaceScreen() {
  const { t } = useTranslation();
  const { currentDraft, generatedOutputs } = useProject();

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Text style={styles.title}>{t('workspace.title')} (Web)</Text>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{currentDraft?.title ?? '-'}</Text>

        <Text style={styles.label}>Raw Input</Text>
        <Text style={styles.value}>{currentDraft?.rawInput ?? '-'}</Text>
      </View>

      <View style={styles.rightPanel}>
        <Text style={styles.title}>{t('workspace.generatedOutputs')}</Text>

        {generatedOutputs.map((output) => (
          <View key={output.id} style={styles.card}>
            <Text style={styles.cardTitle}>{output.title}</Text>
            <Text style={styles.cardContent}>{output.content}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    padding: 24,
    gap: 20,
  },
  leftPanel: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 20,
  },
  rightPanel: {
    flex: 1.3,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    color: Colors.muted,
    marginTop: 12,
    marginBottom: 6,
  },
  value: {
    color: Colors.text,
  },
  card: {
    marginTop: 14,
    backgroundColor: '#0F1527',
    borderRadius: 16,
    padding: 16,
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