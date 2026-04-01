import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../src/constants/colors';

export default function CreatePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <Text style={styles.subtitle}>Paste an idea, transcript, or rough draft.</Text>

      <TextInput
        multiline
        placeholder="Write your raw content here..."
        placeholderTextColor={Colors.muted}
        style={styles.input}
      />

      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Transform options will come in Sprint 2.</Text>
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
  input: {
    minHeight: 180,
    backgroundColor: Colors.surface,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    padding: 16,
    textAlignVertical: 'top',
  },
  placeholder: {
    marginTop: 16,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  placeholderText: {
    color: Colors.muted,
  },
});