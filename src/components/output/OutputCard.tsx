import { useTheme } from "@/src/theme/ThemeContext";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

type OutputCardProps = {
  title: string;
  content: string;
  isLoading?: boolean;
  onCopy?: () => void;
  onRegenerate?: () => void;
  onUseAsDraft?: () => void;
};

export default function OutputCard({
  title,
  content,
  isLoading = false,
  onCopy,
  onRegenerate,
  onUseAsDraft,
}: OutputCardProps) {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>

        <Pressable
          onPress={onCopy}
          disabled={isLoading}
          style={[
            styles.topAction,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              opacity: isLoading ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.topActionText, { color: colors.text }]}>
            Copy
          </Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.contentBox,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {isLoading ? (
          <View style={styles.loadingWrap}>
            <ActivityIndicator color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.muted }]}>
              Regenerating...
            </Text>
          </View>
        ) : (
          <Text style={[styles.content, { color: colors.text }]}>{content}</Text>
        )}
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={onRegenerate}
          disabled={isLoading}
          style={[
            styles.secondaryButton,
            {
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
              opacity: isLoading ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            Regenerate
          </Text>
        </Pressable>

        <Pressable
          onPress={onUseAsDraft}
          disabled={isLoading}
          style={[
            styles.primaryButton,
            {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              opacity: isLoading ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.primaryButtonText, { color: "#FFFFFF" }]}>
            Use as draft
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },
  topAction: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  topActionText: {
    fontSize: 13,
    fontWeight: "600",
  },
  contentBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    minHeight: 120,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
  loadingWrap: {
    minHeight: 90,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});