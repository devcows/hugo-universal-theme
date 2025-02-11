import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Amayara Solutions',
  description: 'Découvrez nos services de recrutement international et de transformation digitale. Solutions sur mesure pour votre entreprise en Tunisie.',
  keywords: 'recrutement international, transformation digitale, services IT, Tunisie, solutions technologiques',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 