import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import getStorage from '../api/storage';
import type { Locale } from '../api/types';
// import type { StorageValue } from '../api/storage';

interface LocaleContextProps {
    locale: Locale | null;
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

function isLocale(value: unknown): value is Locale {
    if (
      value &&
      typeof value === 'object' &&
      'locale' in value &&
      'country' in value
    ) {
      return true;
    }
    return false;
  }
export const useLocale = (): LocaleContextProps => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
};

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale | null>(null);
    const storage = getStorage();

    useEffect(() => {
        // get from chrome storage
        // chrome.storage.local.get('locale', (result) => {
        //     if (result.locale) {
        //         setLocaleState(result.locale);
        //     }
        // });
        storage.getItem('locale').then((result) => {
            if (isLocale(result)) {
                setLocaleState(result);
            }
        });
    }, []);

    const setLocale = (locale: Locale) => {
        setLocaleState(locale);
        storage.setItem('locale', locale as unknown as Record<string, unknown>);
        // chrome.storage.local.set({ locale });
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};
