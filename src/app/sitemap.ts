import { MetadataRoute } from 'next';
import { i18nConfig } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amayara.com';
  const lastModified = new Date();

  // Define all routes
  const routes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/blog'
  ];

  // Generate sitemap entries for each locale and route
  const entries = i18nConfig.locales.flatMap(locale => 
    routes.map(route => ({
      url: `${baseUrl}${locale === i18nConfig.defaultLocale ? '' : `/${locale}`}${route}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  return entries;
} 