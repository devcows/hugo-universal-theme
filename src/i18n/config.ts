export const i18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  localeNames: {
    en: 'English',
    fr: 'Français'
  }
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];

export function getLocaleFromPathname(pathname: string): Locale {
  const locale = pathname.split('/')[1];
  return i18nConfig.locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : i18nConfig.defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  return pathname.replace(`/${locale}`, '') || '/';
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const currentLocale = getLocaleFromPathname(pathname);
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  return locale === i18nConfig.defaultLocale 
    ? pathWithoutLocale 
    : `/${locale}${pathWithoutLocale}`;
} 