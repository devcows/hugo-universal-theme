import { usePathname, useRouter } from 'next/navigation';
import { i18nConfig, getLocalizedPath } from '../i18n/config';
import { useTranslations } from '../hooks/useTranslations';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useTranslations();

  const handleLanguageChange = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const newPath = getLocalizedPath(pathname, newLocale);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Language Switcher */}
      <button
        type="button"
        onClick={handleLanguageChange}
        className="relative inline-flex items-center gap-2 rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-white"
      >
        <span>{locale === 'en' ? 'FR' : 'EN'}</span>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition duration-300 hover:opacity-100"
        />
      </button>
    </div>
  );
} 