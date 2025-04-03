import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { I18nProvider, useLocalTranslation } from "../../../lib/i18n";
import { Button } from "../../ui/button";

// Import component-local translations
import de from "./translations/de.json";
import en from "./translations/en.json";
import fr from "./translations/fr.json";
import it from "./translations/it.json";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "Design System/Language Switcher",
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <I18nProvider>
        <Story />
      </I18nProvider>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

const languageLabels: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  it: "Italiano",
};

// Example with global translations
const DemoContent = () => {
  const { language, t } = useLocalTranslation();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-end">
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col gap-2">
        {languageLabels[language]}- {language}
        <div className="flex gap-2">
          <Button variant="outline">{t("button.submit")}</Button>
          <Button variant="outline">{t("button.cancel")}</Button>
          <Button variant="outline">{t("table.next")}</Button>
        </div>
      </div>
    </div>
  );
};

// Example with component-local translations
const LocalizedContent = () => {
  const { language, t } = useLocalTranslation("language-switcher");

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t("title")}</h2>
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col gap-2">
        <p>
          Current language:{" "}
          <span className="font-medium">
            {languageLabels[language]} ({language.toUpperCase()})
          </span>
        </p>

        <div className="mt-4 rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>
      </div>
    </div>
  );
};

// Story with global translations
export const Global: Story = {
  render: () => <DemoContent />,
};

// Story with component-local translations
export const Local: Story = {
  decorators: [
    (Story) => (
      <I18nProvider
        namespace="language-switcher"
        resources={{
          de,
          en,
          fr,
          it,
        }}
      >
        <Story />
      </I18nProvider>
    ),
  ],
  render: () => <LocalizedContent />,
};
