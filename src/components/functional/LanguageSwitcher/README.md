# Language Switcher Component & i18n System

This document explains how the internationalization (i18n) system works in our project, including both global and component-local translations.

## Overview

Our i18n system is built using:

- `i18next`: Core internationalization framework
- `react-i18next`: React bindings for i18next
- Custom context and hooks for language management

The system supports:

- Multiple languages (German, English, French, Italian)
- Global translations for common UI elements
- Component-local translations for specific components
- Dynamic language switching
- Type-safe language codes

## Local-First Translation Strategy

Our system implements a "local-first" approach to translations, which means:

### 1. Translation Resolution Order

1. First, the system looks for translations in the component's local namespace
2. If not found, it falls back to global translations
3. If still not found, it falls back to the key name

Example:

```tsx
// Local translations (my-component/translations/en.json)
{
  "title": "My Local Title",
  "submit": "Local Submit"  // Overrides global submit button
}

// Global translations (src/i18n/en.json)
{
  "button": {
    "submit": "Global Submit",
    "cancel": "Cancel"
  }
}

// Component usage
const MyComponent = () => {
  const { t } = useLocalTranslation("my-component");
  return (
    <div>
      <h1>{t("title")}</h1>          // Uses "My Local Title"
      <Button>{t("submit")}</Button>  // Uses "Local Submit"
      <Button>{t("button.cancel")}</Button>  // Uses global "Cancel"
    </div>
  );
};
```

### 2. Namespace Management

Components can have multiple translation sources:

```tsx
const MyComponent = () => {
  // Access both local and global translations
  const { t: localT } = useLocalTranslation("my-component");
  const { t: globalT } = useLocalTranslation();

  return (
    <div>
      <h1>{localT("title")}</h1> // Local translation
      <Button>{globalT("button.submit")}</Button> // Global translation
    </div>
  );
};
```

### 3. Translation Override Patterns

You can override global translations at the component level:

```tsx
// Global translation
{
  "button": {
    "submit": "Submit"
  }
}

// Component-local translation
{
  "button.submit": "Send Message"  // Overrides global submit button
}

// Usage
const MyComponent = () => {
  const { t } = useLocalTranslation("my-component");
  return <Button>{t("button.submit")}</Button>;  // Shows "Send Message"
};
```

### 4. Best Practices for Local-First Translations

1. **Component Autonomy**

   - Keep component-specific text in local translations
   - Override global translations only when necessary
   - Use consistent key structures across components

2. **Namespace Organization**

   ```
   components/
     └── MyComponent/
         └── translations/
             ├── de.json  // Component-specific German translations
             ├── en.json  // Component-specific English translations
             └── shared/  // Shared translations with other components
   ```

3. **Translation Key Strategy**

   ```tsx
   // Avoid
   t("submit"); // Too generic

   // Better
   t("action.submit"); // More specific
   t("userForm.submit"); // Context-aware
   ```

4. **Handling Shared Translations**
   - Use global translations for truly common elements
   - Create shared namespaces for feature-specific shared translations
   - Document overridden global translations

## Architecture

### 1. Global Translations

Global translations are managed centrally in `src/lib/i18n.tsx` and include common UI elements like:

- Button labels
- Table navigation
- Form elements

Example of global translations usage:

```tsx
const MyComponent = () => {
  const { t } = useLocalTranslation();
  return <Button>{t("button.submit")}</Button>;
};
```

### 2. Component-Local Translations

Components can have their own translations, colocated with the component files:

```
components/
  └── functional/
      └── LanguageSwitcher/
          ├── LanguageSwitcher.tsx
          ├── LanguageSwitcher.stories.tsx
          └── translations/
              ├── de.json
              ├── en.json
              ├── fr.json
              └── it.json
```

To use component-local translations:

```tsx
const MyComponent = () => {
  const { t } = useLocalTranslation("my-namespace");
  return <h1>{t("title")}</h1>;
};

// Wrap with provider
<I18nProvider
  namespace="my-namespace"
  resources={{
    de: deTranslations,
    en: enTranslations,
    fr: frTranslations,
    it: itTranslations,
  }}
>
  <MyComponent />
</I18nProvider>;
```

## Available Hooks

### `useI18n`

Provides access to the current language and language-switching functionality:

```tsx
const { language, setLanguage } = useI18n();
```

### `useLocalTranslation`

Combines `useI18n` and `useTranslation` for easier access to translations:

```tsx
const { t, language, setLanguage } = useLocalTranslation(namespace?);
```

## Supported Languages

| Code | Language         |
| ---- | ---------------- |
| `de` | German (Default) |
| `en` | English          |
| `fr` | French           |
| `it` | Italian          |

## Best Practices

1. **Global vs Local Translations**

   - Use global translations for common UI elements
   - Use component-local translations for component-specific content

2. **Translation Keys**

   - Use descriptive, hierarchical keys (e.g., `button.submit`)
   - Keep keys consistent across languages

3. **Type Safety**

   - Use the `Language` type for language codes
   - Avoid using string literals for language codes

4. **Namespacing**
   - Use unique namespaces for component-local translations
   - Follow the pattern: `component-name` or `feature-name`

## Example Usage

### Global Translations

```tsx
const MyButton = () => {
  const { t } = useLocalTranslation();
  return <Button>{t("button.submit")}</Button>;
};
```

### Component-Local Translations

```tsx
// translations/en.json
{
  "title": "My Component",
  "description": "This is my component"
}

// MyComponent.tsx
const MyComponent = () => {
  const { t } = useLocalTranslation("my-component");
  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

// Usage with provider
<I18nProvider
  namespace="my-component"
  resources={translations}
>
  <MyComponent />
</I18nProvider>
```

## Testing

Use Storybook to test translations:

- Create stories for different languages
- Test both global and component-local translations
- Verify language switching behavior

Example in `LanguageSwitcher.stories.tsx` shows:

- Global translation usage
- Component-local translation integration
- Language switching functionality
- Different content types (buttons, text, etc.)

## Language-Aware Components Pattern

This pattern makes components directly responsible for their translations through props, providing a simpler and more explicit way to handle translations.

### 1. Basic Implementation

```tsx
type Language = "de" | "en" | "fr" | "it";

interface MyComponentProps {
  lang: Language;
  // other props...
}

const MyComponent: React.FC<MyComponentProps> = ({ lang }) => {
  // Load translations based on language
  const translations = {
    de: deTranslations,
    en: enTranslations,
    fr: frTranslations,
    it: itTranslations,
  }[lang];

  return (
    <div>
      <h1>{translations.title}</h1>
      <p>{translations.description}</p>
    </div>
  );
};

// Usage
<MyComponent lang="en" />;
```

### 2. With Type Safety

```tsx
// types/translations.ts
interface ComponentTranslations {
  title: string;
  description: string;
  // ... other translation keys
}

// MyComponent.tsx
import { ComponentTranslations } from "./types/translations";

interface Props {
  lang: Language;
  translations: Record<Language, ComponentTranslations>;
}

const MyComponent: React.FC<Props> = ({ lang, translations }) => {
  const t = translations[lang];

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
};
```

### 3. Higher-Order Component Pattern

```tsx
const withTranslations = <P extends object>(
  WrappedComponent: React.ComponentType<
    P & { translations: ComponentTranslations }
  >,
  getTranslations: (lang: Language) => ComponentTranslations
) => {
  return ({ lang, ...props }: P & { lang: Language }) => {
    const translations = getTranslations(lang);
    return <WrappedComponent {...(props as P)} translations={translations} />;
  };
};

// Usage
const MyComponent = ({
  translations,
}: {
  translations: ComponentTranslations;
}) => <div>{translations.title}</div>;

const LanguageAwareMyComponent = withTranslations(
  MyComponent,
  (lang) =>
    ({
      de: deTranslations,
      en: enTranslations,
      fr: frTranslations,
      it: itTranslations,
    }[lang])
);

// In your app
<LanguageAwareMyComponent lang="en" />;
```

### 4. Benefits of Language-Aware Components

1. **Explicit Dependencies**

   - Components clearly declare their language requirements
   - No hidden context dependencies
   - Easier to test and maintain

2. **Improved Performance**

   - No context lookups or subscription overhead
   - Translations can be loaded and cached efficiently
   - Better tree-shaking possibilities

3. **Simplified Testing**

   ```tsx
   // Easy to test different languages
   it("renders in English", () => {
     render(<MyComponent lang="en" />);
     expect(screen.getByText("Hello")).toBeInTheDocument();
   });

   it("renders in German", () => {
     render(<MyComponent lang="de" />);
     expect(screen.getByText("Hallo")).toBeInTheDocument();
   });
   ```

4. **Better Developer Experience**
   - Clear prop requirements
   - TypeScript support out of the box
   - No need to wrap components in providers

### 5. Implementation Example

```tsx
// Button.tsx
interface ButtonTranslations {
  label: string;
  aria: {
    description: string;
  };
}

interface ButtonProps {
  lang: Language;
  onClick: () => void;
}

const buttonTranslations: Record<Language, ButtonTranslations> = {
  en: {
    label: "Submit",
    aria: { description: "Submit form" },
  },
  de: {
    label: "Absenden",
    aria: { description: "Formular absenden" },
  },
  // ... other languages
};

const Button: React.FC<ButtonProps> = ({ lang, onClick }) => {
  const t = buttonTranslations[lang];

  return (
    <button onClick={onClick} aria-label={t.aria.description}>
      {t.label}
    </button>
  );
};

// Usage
<Button lang="de" onClick={handleSubmit} />;
```

### 6. Managing Translations

1. **Colocated Translations**

   ```
   components/
     └── Button/
         ├── Button.tsx
         ├── Button.test.tsx
         └── translations/
             ├── index.ts      // exports all translations
             ├── de.json
             ├── en.json
             ├── fr.json
             └── it.json
   ```

2. **Lazy Loading**

   ```tsx
   const MyComponent: React.FC<Props> = ({ lang }) => {
     const [translations, setTranslations] = useState<ComponentTranslations>();

     useEffect(() => {
       import(`./translations/${lang}.json`).then((module) =>
         setTranslations(module.default)
       );
     }, [lang]);

     if (!translations) return <Skeleton />;

     return <div>{translations.title}</div>;
   };
   ```

### 7. Migration Strategy

1. **Gradual Migration**

   - Start with new components
   - Migrate existing components when touching them
   - Keep both systems running in parallel during migration

2. **Hybrid Approach**

   ```tsx
   const MyComponent: React.FC<Props> = ({ lang }) => {
     // Fall back to i18next if no direct translations provided
     const { t } = useLocalTranslation();
     const translations = lang ? directTranslations[lang] : t;

     return <div>{translations.title}</div>;
   };
   ```

This approach provides a simpler, more explicit way to handle translations while maintaining type safety and good developer experience. It's particularly useful for component libraries and microfrontends where you want to avoid global state and context dependencies.
