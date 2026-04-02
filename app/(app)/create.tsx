import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors } from '../../src/constants/colors';
import { PLATFORM_OPTIONS, TONE_OPTIONS, TRANSFORM_OPTIONS } from '../../src/constants/options';
import { generateMockOutputs } from '../../src/services/generator/mockGenerator.service';
import { useProject } from '../../src/store/project.context';
import {
  PlatformTarget,
  ProjectDraft,
  ToneType,
  TransformType,
} from '../../src/types/project';

export default function CreatePage() {
  const { t } = useTranslation();
  const { setCurrentDraft, setGeneratedOutputs } = useProject();

  const [title, setTitle] = useState('');
  const [rawInput, setRawInput] = useState('');
  const [platformTarget, setPlatformTarget] =
    useState<PlatformTarget>('youtube_shorts');
  const [transformType, setTransformType] =
    useState<TransformType>('shorts_script');
  const [tone, setTone] = useState<ToneType>('viral');
  const [error, setError] = useState('');

  function handleGenerate() {
    if (!title.trim()) {
      setError(t('createForm.validationTitle'));
      return;
    }

    if (!rawInput.trim()) {
      setError(t('createForm.validationRawInput'));
      return;
    }

    setError('');

    const draft: ProjectDraft = {
      title: title.trim(),
      rawInput: rawInput.trim(),
      platformTarget,
      transformType,
      tone,
    };

    const outputs = generateMockOutputs(draft);

    setCurrentDraft(draft);
    setGeneratedOutputs(outputs);

    router.push('/workspace');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{t('create.title')}</Text>
      <Text style={styles.subtitle}>{t('create.subtitle')}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>{t('createForm.projectTitle')}</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder={t('createForm.titlePlaceholder')}
          placeholderTextColor={Colors.muted}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{t('createForm.rawInput')}</Text>
        <TextInput
          value={rawInput}
          onChangeText={setRawInput}
          placeholder={t('createForm.rawInputPlaceholder')}
          placeholderTextColor={Colors.muted}
          style={[styles.input, styles.textArea]}
          multiline
          textAlignVertical="top"
        />
      </View>

      <SelectionGroup
        title={t('createForm.platform')}
        options={PLATFORM_OPTIONS}
        selectedValue={platformTarget}
        onSelect={(value) => setPlatformTarget(value as PlatformTarget)}
      />

      <SelectionGroup
        title={t('createForm.transformType')}
        options={TRANSFORM_OPTIONS}
        selectedValue={transformType}
        onSelect={(value) => setTransformType(value as TransformType)}
      />

      <SelectionGroup
        title={t('createForm.tone')}
        options={TONE_OPTIONS}
        selectedValue={tone}
        onSelect={(value) => setTone(value as ToneType)}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>{t('createForm.generate')}</Text>
      </Pressable>
    </ScrollView>
  );
}

type SelectionOption = {
  labelKey: string;
  value: string;
};

function SelectionGroup({
  title,
  options,
  selectedValue,
  onSelect,
}: {
  title: string;
  options: SelectionOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.optionsWrap}>
        {options.map((option) => {
          const isActive = option.value === selectedValue;

          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[styles.optionChip, isActive && styles.optionChipActive]}
            >
              <Text
                style={[
                  styles.optionChipText,
                  isActive && styles.optionChipTextActive,
                ]}
              >
                {t(option.labelKey)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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
  },
  subtitle: {
    color: Colors.muted,
    marginTop: 8,
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: Colors.muted,
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.surface,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 160,
  },
  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  optionChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionChipText: {
    color: Colors.text,
    fontWeight: '600',
  },
  optionChipTextActive: {
    color: '#FFFFFF',
  },
  error: {
    color: Colors.danger,
    marginBottom: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});