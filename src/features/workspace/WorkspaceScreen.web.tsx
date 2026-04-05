import OutputCard from '@/src/components/output/OutputCard';
import { generateContent } from '@/src/services/api/generate';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useProject } from '../../store/project.context';

export default function WorkspaceScreen() {
  const { t } = useTranslation();

  const { currentDraft, setCurrentDraft, generatedOutputs, replaceGeneratedOutput } = useProject();
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const router = useRouter();


  const handleUseAsDraft = (text: string) => {
    if (!currentDraft) return;

    const updatedDraft = {
      ...currentDraft,
      rawInput: text,
    };

    setCurrentDraft(updatedDraft);

    router.push('/(app)/create'); // senin route'una göre değişebilir
  };

  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copied', 'Output copied to clipboard.');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy output.');
    }
  };
  const handleRegenerate = async (outputId: string) => {
    if (!currentDraft) {
      Alert.alert('Error', 'Draft data not found.');
      return;
    }

    try {
      setRegeneratingId(outputId);

      const regeneratedOutput = await generateContent(currentDraft);

      replaceGeneratedOutput(outputId, {
        ...regeneratedOutput,
        id: outputId,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to regenerate output.';
      Alert.alert('Error', message);
    } finally {
      setRegeneratingId(null);
    }


  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('workspace.title')} (WEB)</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{currentDraft?.title ?? '-'}</Text>

        <Text style={styles.label}>Raw Input</Text>
        <Text style={styles.value}>{currentDraft?.rawInput ?? '-'}</Text>

        <Text style={styles.label}>Platform</Text>
        <Text style={styles.value}>{currentDraft?.platform ?? '-'}</Text>

        <Text style={styles.label}>Transform Type</Text>
        <Text style={styles.value}>{currentDraft?.transformType ?? '-'}</Text>

        <Text style={styles.label}>Tone</Text>
        <Text style={styles.value}>{currentDraft?.tone ?? '-'}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('workspace.generatedOutputs')}</Text>

      {generatedOutputs.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.value}>Henüz output yok.</Text>
        </View>
      ) : (
        generatedOutputs.map((output) => {
          const contentParts = [
            output.result.hook ? `Hook:\n${output.result.hook}` : null,
            output.result.body ? `Body:\n${output.result.body}` : null,
            output.result.cta ? `CTA:\n${output.result.cta}` : null,
            output.result.hashtags?.length
              ? `Hashtags:\n${output.result.hashtags.join(' ')}`
              : null,
          ].filter(Boolean) as string[];

          const combinedContent = [
            output.result.title ? output.result.title : null,
            contentParts.join('\n\n'),
          ]
            .filter(Boolean)
            .join('\n\n');

          return (
            <OutputCard
              key={output.id}
              title={output.result.title || 'Generated Output'}
              content={combinedContent}
              isLoading={regeneratingId === output.id}
              onCopy={() => handleCopy(combinedContent)}
              onRegenerate={() => handleRegenerate(output.id)}
              onUseAsDraft={() => handleUseAsDraft(combinedContent)}
            />
          );
        })
      )}
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
  metaText: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 12,
  },
});