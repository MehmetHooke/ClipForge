import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

const LANGUAGE_STORAGE_KEY = "clipforge_language";

export const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      const locales = getLocales();
      const deviceLanguage = locales?.[0]?.languageCode ?? "tr";

      if (deviceLanguage === "tr") {
        callback("tr");
        return;
      }

      callback("en");
    } catch {
      callback("tr");
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch {}
  },
};
