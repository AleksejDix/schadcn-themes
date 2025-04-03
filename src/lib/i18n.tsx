import React, { createContext, useContext, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

export type Language = "de" | "en" | "fr" | "it";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Global translations
const globalTranslations = {
  de: {
    "button.submit": "Absenden",
    "button.cancel": "Abbrechen",
    "table.next": "Nächste",
    "table.previous": "Zurück",
    "checkbox.label": "Auswählen",
  },
  en: {
    "button.submit": "Submit",
    "button.cancel": "Cancel",
    "table.next": "Next",
    "table.previous": "Previous",
    "checkbox.label": "Select",
  },
  fr: {
    "button.submit": "Soumettre",
    "button.cancel": "Annuler",
    "table.next": "Suivant",
    "table.previous": "Précédent",
    "checkbox.label": "Sélectionner",
  },
  it: {
    "button.submit": "Invia",
    "button.cancel": "Annulla",
    "table.next": "Prossimo",
    "table.previous": "Precedente",
    "checkbox.label": "Seleziona",
  },
};

// Initialize i18next
i18next.use(initReactI18next).init({
  resources: {
    de: {
      global: globalTranslations.de,
    },
    en: {
      global: globalTranslations.en,
    },
    fr: {
      global: globalTranslations.fr,
    },
    it: {
      global: globalTranslations.it,
    },
  },
  lng: "de", // default language
  fallbackLng: "de",
  defaultNS: "global",
  interpolation: {
    escapeValue: false,
  },
});

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: React.ReactNode;
  namespace?: string;
  resources?: Record<Language, Record<string, any>>;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  namespace,
  resources,
}) => {
  const [language, setLanguage] = useState<Language>("de");

  // Add component-local translations if provided
  React.useEffect(() => {
    if (namespace && resources) {
      Object.entries(resources).forEach(([lang, translations]) => {
        i18next.addResourceBundle(lang, namespace, translations, true, true);
      });

      return () => {
        Object.keys(resources).forEach((lang) => {
          i18next.removeResourceBundle(lang, namespace);
        });
      };
    }
  }, [namespace, resources]);

  // Update language in i18next when it changes in context
  React.useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

// Helper hook that combines useI18n and useTranslation
export const useLocalTranslation = (namespace?: string) => {
  const { language, setLanguage } = useI18n();
  const { t } = useTranslation(namespace);
  return { t, language, setLanguage };
};
