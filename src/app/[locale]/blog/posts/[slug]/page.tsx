'use client';

import { posts } from '@/data/blog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { Locale } from '@/i18n/config';

export default function BlogPost({
  params: { locale, slug }
}: {
  params: { locale: Locale; slug: string }
}) {
  const { t } = useTranslations();
  const post = posts.find(p => p.href === `/blog/posts/${slug}`);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navigation />
        <main className="container py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{t('blog.notFound.title')}</h1>
            <p className="mt-4 text-zinc-400">{t('blog.notFound.description')}</p>
            <Link href={`/${locale}/blog`} className="mt-8 inline-block btn-secondary">
              {t('blog.notFound.backToBlog')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const postContent = post.translations[locale as keyof typeof post.translations];

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        <article className="py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {/* Header */}
              <header className="text-center">
                <div className="flex items-center justify-center gap-x-4 text-xs text-zinc-500 mb-6">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  {postContent.title}
                </h1>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-invert prose-zinc mx-auto">
                <p className="lead">{postContent.content.introduction}</p>

                {postContent.content.sections.map((section, index) => (
                  <section key={index} className="mt-12">
                    <h2>{section.title}</h2>
                    <div className="whitespace-pre-line">{section.content}</div>
                  </section>
                ))}

                <section className="mt-12">
                  <div className="whitespace-pre-line">{postContent.content.conclusion}</div>
                </section>
              </div>
            </motion.div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
} 