import React from "react";
import { useI18n, Language } from "../../../lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code as Language)}
              lang={code}
              className={language === code ? "bg-accent" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
