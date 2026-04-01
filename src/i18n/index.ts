import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languageDetector } from "./languageDetector";
import { resources } from "./resources";

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
