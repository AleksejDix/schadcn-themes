import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import deTranslations from "./locales/de.json";
import enTranslations from "./locales/en.json";
import frTranslations from "./locales/fr.json";
import itTranslations from "./locales/it.json";

// Import component translations
import languageSwitcherDe from "../components/functional/LanguageSwitcher/translations/de.json";
import languageSwitcherEn from "../components/functional/LanguageSwitcher/translations/en.json";
import languageSwitcherFr from "../components/functional/LanguageSwitcher/translations/fr.json";
import languageSwitcherIt from "../components/functional/LanguageSwitcher/translations/it.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: deTranslations,
        "language-switcher": languageSwitcherDe,
      },
      en: {
        translation: enTranslations,
        "language-switcher": languageSwitcherEn,
      },
      fr: {
        translation: frTranslations,
        "language-switcher": languageSwitcherFr,
      },
      it: {
        translation: itTranslations,
        "language-switcher": languageSwitcherIt,
      },
    },
    fallbackLng: "de",
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
