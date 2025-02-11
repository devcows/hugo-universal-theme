import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Amayara Solutions',
  description: 'Discover insights and best practices in QA testing, automation, and software quality assurance from our expert team.',
  keywords: 'QA blog, software testing, test automation, quality assurance, best practices',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 