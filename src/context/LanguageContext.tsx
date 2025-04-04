
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LANGUAGES, getInitialLanguage } from '@/i18n/translations';
import { toast } from '@/components/ui/use-toast';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Show toast when language changes
    const langName = LANGUAGES[lang].nativeName;
    toast({
      title: `Language changed to ${langName}`,
      description: "The page will now display content in your selected language.",
    });
  };

  // Load translations
  useEffect(() => {
    import('@/i18n/translations').then(module => {
      setTranslations(module.translations[language]);
    });
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
