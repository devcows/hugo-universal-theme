import type { Metadata } from 'next';
import { posts } from '@/data/blog';
import { Locale, i18nConfig } from '@/i18n/config';

type Props = {
  params: { 
    slug: string;
    locale: Locale;
  }
  children: React.ReactNode
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = posts.find(p => p.href === `/blog/posts/${params.slug}`);
  const locale = params.locale || i18nConfig.defaultLocale;

  if (!post) {
    return {
      title: 'Post Not Found | Amayara Solutions',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const postContent = post.translations[locale as keyof typeof post.translations];

  return {
    title: `${postContent.title} | Amayara Solutions`,
    description: postContent.description,
    keywords: post.tags.join(', '),
  };
}

export default function BlogPostLayout({ children }: Props) {
  return children;
} 