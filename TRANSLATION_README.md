# Translation Configuration

## Overview

This project uses `react-i18next` for internationalization support. Currently, the AppBar component is translated into English and Spanish.

## Supported Languages

- English (en) - Default
- Spanish (es)

## File Structure

```
src/
├── i18n/
│   ├── config.ts          # i18n configuration
│   └── locales/
│       ├── en.json        # English translations
│       └── es.json        # Spanish translations
├── components/
│   └── LanguageSwitcher.tsx # Language switcher component
└── hooks/
    └── useAppTranslation.ts # Custom translation hook
```

## How to Use

### In Components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('appbar.title')}</h1>
    </div>
  );
};
```

### Using the Custom Hook

```tsx
import useAppTranslation from '../hooks/useAppTranslation';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useAppTranslation();
  
  return (
    <div>
      <h1>{t('appbar.title')}</h1>
      <button onClick={() => changeLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  );
};
```

## Adding New Translations

1. Add the translation key to both `en.json` and `es.json` files
2. Use the `t()` function in your component to access the translation

### Example:

**en.json**
```json
{
  "appbar": {
    "title": "ofblog",
    "main": "Main",
    "posts": "Posts"
  }
}
```

**es.json**
```json
{
  "appbar": {
    "title": "ofblog",
    "main": "Principal",
    "posts": "Publicaciones"
  }
}
```

## Language Switching

The language switcher is located in the AppBar and allows users to switch between English and Spanish. The current language is persisted in the browser's localStorage by i18next.

## Features

- Automatic language detection
- Persistent language preference
- Fallback to English if translation is missing
- Clean and responsive language switcher UI
