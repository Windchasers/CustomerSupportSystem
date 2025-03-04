import { useState, useEffect } from 'react';
import { useLanguage } from './context';

export type Language = 'en' | 'zh';

export const defaultLanguage: Language = 'en';

export function useTranslation() {
  const { language, setLanguage } = useLanguage();
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await import(`./locales/${language}.json`);
      setTranslations(response.default);
    };
    loadTranslations();
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