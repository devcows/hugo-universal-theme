'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { posts } from '@/data/blog';
import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

interface BlogProps {
  showAll?: boolean;
}

export default function Blog({ showAll = false }: BlogProps) {
  const { t, locale } = useTranslations();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const displayPosts = showAll ? posts : posts.slice(0, 3);

  const handleImageError = (postId: string) => {
    setImageErrors(prev => ({ ...prev, [postId]: true }));
  };

  const getLocalizedPostUrl = (href: string) => {
    return locale === 'en' ? href : `/${locale}${href}`;
  };

  const getImagePath = (imagePath: string) => {
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>
      
      <div className="container relative">
        {!showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <span className="text-white">{t('blog.title')}</span>
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              {t('blog.description')}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${showAll ? 'mt-0' : 'mt-16'} space-y-8`}
        >
          {displayPosts.map((post, index) => (
            <motion.article
              key={post.translations[locale as keyof typeof post.translations].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative isolate flex flex-col gap-8 lg:flex-row"
            >
              <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-zinc-800 object-cover">
                  {!imageErrors[post.translations[locale as keyof typeof post.translations].title] ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={getImagePath(post.image)}
                        alt={post.translations[locale as keyof typeof post.translations].title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-2xl object-cover"
                        onError={() => handleImageError(post.translations[locale as keyof typeof post.translations].title)}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Mi85OEI2PTZFOT5ZXVlZfG1+fW5/kZuRm9TU3t7/2wBDARUXFx4eHh0eHh07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
                      {t('blog.imageNotAvailable')}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-zinc-500">
                    {post.date}
                  </time>
                  <span className="text-zinc-500">{post.readTime}</span>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <Link href={getLocalizedPostUrl(post.href)} className="relative z-10">
                      <span className="absolute inset-0" />
                      {post.translations[locale as keyof typeof post.translations].title}
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-zinc-400">
                    {post.translations[locale as keyof typeof post.translations].description}
                  </p>
                </div>
                <div className="mt-6 flex border-t border-zinc-800 pt-6">
                  <div className="relative flex items-center gap-x-4">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!showAll && posts.length > 3 && (
          <div className="mt-10 flex justify-center">
            <Link
              href={locale === 'en' ? '/blog' : `/${locale}/blog`}
              className="btn-secondary"
            >
              <span>{t('blog.viewAll')}</span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 3.25L10.25 8L6.75 12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 