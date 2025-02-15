import { usePathname } from 'next/navigation';
import { en } from '../i18n/en';
import { fr } from '../i18n/fr';
import { Locale, getLocaleFromPathname } from '../i18n/config';

const translations = {
  en,
  fr
} as const;

type TranslationsType = typeof en;
type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K
      : never
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationsType>;

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function useTranslations() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  
  function t(key: TranslationKey): string {
    const translation = getNestedValue(translations[locale], key);
    if (!translation && process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
    }
    return translation || getNestedValue(translations.en, key) || key;
  }

  return {
    t,
    locale
  };
} 