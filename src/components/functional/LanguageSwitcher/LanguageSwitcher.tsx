import React, { useCallback } from "react";
import { useI18n, Language } from "../../../lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Languages } from "lucide-react";
const languageLabels: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  it: "Italiano",
};

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useI18n();

  const changeLanguage = useCallback(
    (code: Language) => {
      setLanguage(code);
    },
    [setLanguage]
  );

  return (
    <nav aria-label="Language selection">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Languages size={16} aria-hidden="true" />
            {languageLabels[language]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          {Object.entries(languageLabels).map(([code, label]) => (
            <DropdownMenuCheckboxItem
              checked={language === code}
              key={code}
              onCheckedChange={() => changeLanguage(code as Language)}
              lang={code}
              className={language === code ? "bg-accent" : ""}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
