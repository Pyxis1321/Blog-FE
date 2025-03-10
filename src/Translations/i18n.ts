import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TranslationResources } from "./EnglishTranslation";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TranslationResources,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
