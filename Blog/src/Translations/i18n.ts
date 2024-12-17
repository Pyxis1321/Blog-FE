import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TranslationResources } from "./CzechTranslation";

i18n.use(initReactI18next).init({
  resources: {
    cs: {
      translation: TranslationResources,
    },
  },
  lng: "cs",
  fallbackLng: "cs",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
