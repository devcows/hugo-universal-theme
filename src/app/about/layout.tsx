import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos | Amayara Solutions',
  description: 'Découvrez Amayara Solutions, votre partenaire de confiance dans la transformation digitale et le recrutement international en Tunisie.',
  keywords: 'Amayara Solutions, recrutement international, transformation digitale, Tunisie, IT solutions',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 