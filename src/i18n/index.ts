import { useState, useEffect } from 'react';
import { useLanguage } from './context';
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

export type Language = 'en' | 'zh';

export const defaultLanguage: Language = 'en';

export function useTranslation() {
  const { language, setLanguage } = useLanguage();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    setTranslations(language === 'en' ? enTranslations : zhTranslations);
  }, [language]);

  const t = (key: string) => {
    if (!translations) return '';
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      value = value[k];
      if (!value) return key;
    }
    return value;
  };

  return { t, language, setLanguage };
}