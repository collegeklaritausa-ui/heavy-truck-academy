import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Language, 
  languages, 
  translations, 
  TranslationKeys,
  getBrowserLanguage,
  getStoredLanguage,
  setStoredLanguage,
  getLocalizedField
} from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  languages: typeof languages;
  getLocalized: <T extends Record<string, unknown>>(record: T, fieldPrefix: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return getStoredLanguage() || getBrowserLanguage();
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  }, []);

  const dir = languages.find(l => l.code === language)?.dir || 'ltr';
  const isRTL = dir === 'rtl';

  // Update document direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Add RTL class for Tailwind
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language, dir, isRTL]);

  const getLocalized = useCallback(<T extends Record<string, unknown>>(
    record: T, 
    fieldPrefix: string
  ): string => {
    return getLocalizedField(record, fieldPrefix, language);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir,
    isRTL,
    languages,
    getLocalized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for getting localized database fields
export function useLocalized() {
  const { getLocalized, language } = useLanguage();
  return { getLocalized, language };
}
